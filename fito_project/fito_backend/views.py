from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter, NumberFilter, DateFilter
from .models import Rua, Estante, Andar, Posicao, Caixa, Documento
from .serializers import (
    RuaSerializer, EstanteSerializer, AndarSerializer, PosicaoSerializer, CaixaSerializer, DocumentoSerializer
)
from rest_framework import filters
from .permissions import IsAdminOrAuthenticatedWrite
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import FileResponse, Http404

class RuaViewSet(viewsets.ModelViewSet):
    queryset = Rua.objects.all()
    serializer_class = RuaSerializer
    permission_classes = [IsAdminOrAuthenticatedWrite]
    ordering = ['id']

class EstanteViewSet(viewsets.ModelViewSet):
    queryset = Estante.objects.all()
    serializer_class = EstanteSerializer
    permission_classes = [IsAdminOrAuthenticatedWrite]

class AndarViewSet(viewsets.ModelViewSet):
    queryset = Andar.objects.all()
    serializer_class = AndarSerializer
    permission_classes = [IsAdminOrAuthenticatedWrite]

class PosicaoViewSet(viewsets.ModelViewSet):
    queryset = Posicao.objects.all()
    serializer_class = PosicaoSerializer
    permission_classes = [IsAdminOrAuthenticatedWrite]

class CaixaViewSet(viewsets.ModelViewSet):
    queryset = Caixa.objects.all()
    serializer_class = CaixaSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['posicao', 'caixa']
    ordering_fields = ['caixa', 'posicao']
    ordering = ['id']
    permission_classes = [IsAdminOrAuthenticatedWrite]

class DocumentoFilter(FilterSet):
    setor = CharFilter(field_name='setor', lookup_expr='icontains')
    tipo = CharFilter(field_name='tipo', lookup_expr='icontains')
    data_arquivamento = DateFilter(field_name='data_arquivamento', lookup_expr='exact')
    data_arquivamento__gte = DateFilter(field_name='data_arquivamento', lookup_expr='gte')
    data_arquivamento__lte = DateFilter(field_name='data_arquivamento', lookup_expr='lte')
    data_prevista_descarte = DateFilter(field_name='data_prevista_descarte', lookup_expr='exact')
    caixa = NumberFilter(field_name='caixa')
    nome_responsavel = CharFilter(field_name='nome_responsavel', lookup_expr='icontains')

    class Meta:
        model = Documento
        fields = ['setor', 'tipo', 'data_arquivamento', 'data_arquivamento__gte', 'data_arquivamento__lte', 'data_prevista_descarte', 'caixa', 'nome_responsavel']

class DocumentoViewSet(viewsets.ModelViewSet):
    queryset = Documento.objects.all()
    serializer_class = DocumentoSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = DocumentoFilter
    search_fields = ['nome_responsavel', 'setor', 'tipo']
    ordering_fields = ['data_arquivamento', 'data_prevista_descarte', 'setor', 'tipo', 'nome_responsavel', 'caixa']
    ordering = ['id']
    permission_classes = [IsAdminOrAuthenticatedWrite]

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def download_pdf(self, request, pk=None):
        doc = self.get_object()
        if not doc.arquivo_pdf:
            raise Http404('Documento não possui PDF.')
        response = FileResponse(doc.arquivo_pdf.open('rb'), as_attachment=True, filename=doc.arquivo_pdf.name)
        return response 