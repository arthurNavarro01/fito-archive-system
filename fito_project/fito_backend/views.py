from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter, NumberFilter, DateFilter
from .models import Rua, Estante, Andar, Posicao, Caixa, Documento
from .serializers import (
    RuaSerializer, EstanteSerializer, AndarSerializer, PosicaoSerializer, CaixaSerializer, DocumentoSerializer
)
from rest_framework import filters

class RuaViewSet(viewsets.ModelViewSet):
    queryset = Rua.objects.all()
    serializer_class = RuaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EstanteViewSet(viewsets.ModelViewSet):
    queryset = Estante.objects.all()
    serializer_class = EstanteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AndarViewSet(viewsets.ModelViewSet):
    queryset = Andar.objects.all()
    serializer_class = AndarSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class PosicaoViewSet(viewsets.ModelViewSet):
    queryset = Posicao.objects.all()
    serializer_class = PosicaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CaixaViewSet(viewsets.ModelViewSet):
    queryset = Caixa.objects.all()
    serializer_class = CaixaSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['posicao', 'caixa']
    ordering_fields = ['caixa', 'posicao']
    ordering = ['id']
    permission_classes = [IsAuthenticatedOrReadOnly]

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
    ordering_fields = ['nome_responsavel', 'setor', 'tipo', 'data_arquivamento', 'data_prevista_descarte', 'caixa']
    ordering = ['id']
    permission_classes = [IsAuthenticatedOrReadOnly] 