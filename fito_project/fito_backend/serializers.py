from rest_framework import serializers
from .models import Rua, Estante, Andar, Posicao, Caixa, Documento
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RuaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rua
        fields = '__all__'

class EstanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estante
        fields = '__all__'

class AndarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Andar
        fields = '__all__'

class PosicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posicao
        fields = '__all__'

class CaixaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caixa
        fields = '__all__'

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = '__all__'

    def validate(self, data):
        # Limitar 50 documentos por caixa
        caixa = data.get('caixa')
        if caixa and Documento.objects.filter(caixa=caixa).count() >= 50:
            raise serializers.ValidationError('Esta caixa já possui 50 documentos.')
        # Validar datas
        data_arquivamento = data.get('data_arquivamento')
        data_prevista_descarte = data.get('data_prevista_descarte')
        if data_arquivamento and data_prevista_descarte:
            if data_prevista_descarte <= data_arquivamento:
                raise serializers.ValidationError('A data prevista para descarte deve ser posterior à data de arquivamento.')
        # Validar arquivo PDF
        arquivo_pdf = data.get('arquivo_pdf')
        if arquivo_pdf:
            if not arquivo_pdf.name.lower().endswith('.pdf'):
                raise serializers.ValidationError('O arquivo deve ser um PDF.')
            if hasattr(arquivo_pdf, 'content_type') and arquivo_pdf.content_type != 'application/pdf':
                raise serializers.ValidationError('O arquivo deve ser um PDF.')
            if arquivo_pdf.size > 20 * 1024 * 1024:
                raise serializers.ValidationError('O arquivo PDF não pode exceder 20MB.')
        return data

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        request = self.context.get('request')
        if instance.arquivo_pdf and request:
            rep['arquivo_pdf'] = request.build_absolute_uri(instance.arquivo_pdf.url)
        return rep 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adicione campos extras ao token se desejar
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Adicione dados extras à resposta, se desejar
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        return data 