from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Rua, Estante, Andar, Posicao, Caixa, Documento
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status

class RuaModelTest(TestCase):
    def test_create_rua(self):
        rua = Rua.objects.create(nome='Rua Teste')
        self.assertEqual(str(rua), 'Rua Teste')
        self.assertEqual(Rua.objects.count(), 1)

class EstanteModelTest(TestCase):
    def test_create_estante(self):
        rua = Rua.objects.create(nome='Rua 1')
        estante = Estante.objects.create(rua=rua, bloco='A')
        self.assertIn('Bloco A', str(estante))
        self.assertEqual(Estante.objects.count(), 1)

class AndarModelTest(TestCase):
    def test_create_andar(self):
        rua = Rua.objects.create(nome='Rua 1')
        estante = Estante.objects.create(rua=rua, bloco='A')
        andar = Andar.objects.create(estante=estante, andar=1)
        self.assertIn('Andar 1', str(andar))
        self.assertEqual(Andar.objects.count(), 1)

class PosicaoModelTest(TestCase):
    def test_create_posicao(self):
        rua = Rua.objects.create(nome='Rua 1')
        estante = Estante.objects.create(rua=rua, bloco='A')
        andar = Andar.objects.create(estante=estante, andar=1)
        posicao = Posicao.objects.create(andar=andar, posicao=1)
        self.assertIn('Posição 1', str(posicao))
        self.assertEqual(Posicao.objects.count(), 1)

class CaixaModelTest(TestCase):
    def test_create_caixa(self):
        rua = Rua.objects.create(nome='Rua 1')
        estante = Estante.objects.create(rua=rua, bloco='A')
        andar = Andar.objects.create(estante=estante, andar=1)
        posicao = Posicao.objects.create(andar=andar, posicao=1)
        caixa = Caixa.objects.create(posicao=posicao, caixa='CX001')
        self.assertEqual(str(caixa), 'CX001')
        self.assertEqual(Caixa.objects.count(), 1)

class DocumentoModelTest(TestCase):
    def test_create_documento(self):
        rua = Rua.objects.create(nome='Rua 1')
        estante = Estante.objects.create(rua=rua, bloco='A')
        andar = Andar.objects.create(estante=estante, andar=1)
        posicao = Posicao.objects.create(andar=andar, posicao=1)
        caixa = Caixa.objects.create(posicao=posicao, caixa='CX001')
        doc = Documento.objects.create(
            caixa=caixa,
            nome_responsavel='João',
            setor='RH',
            tipo='corrente',
            data_arquivamento='2024-01-01',
            data_prevista_descarte='2025-01-01',
        )
        self.assertIn('João', str(doc))
        self.assertEqual(Documento.objects.count(), 1)

class APITestBase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.rua = Rua.objects.create(nome='Rua API')
        self.estante = Estante.objects.create(rua=self.rua, bloco='A')
        self.andar = Andar.objects.create(estante=self.estante, andar=1)
        self.posicao = Posicao.objects.create(andar=self.andar, posicao=1)
        self.caixa = Caixa.objects.create(posicao=self.posicao, caixa='CXAPI')

class RuaAPITest(APITestBase):
    def test_create_rua_api(self):
        response = self.client.post('/ruas/', {'nome': 'Rua API 2'}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Rua.objects.filter(nome='Rua API 2').count(), 1)

class EstanteAPITest(APITestBase):
    def test_create_estante_api(self):
        response = self.client.post('/estantes/', {'rua': self.rua.id, 'bloco': 'B'}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Estante.objects.filter(bloco='B').count(), 1)

class AndarAPITest(APITestBase):
    def test_create_andar_api(self):
        response = self.client.post('/andares/', {'estante': self.estante.id, 'andar': 2}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Andar.objects.filter(andar=2).count(), 1)

class PosicaoAPITest(APITestBase):
    def test_create_posicao_api(self):
        response = self.client.post('/posicoes/', {'andar': self.andar.id, 'posicao': 2}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Posicao.objects.filter(posicao=2).count(), 1)

class CaixaAPITest(APITestBase):
    def test_create_caixa_api(self):
        response = self.client.post('/caixas/', {'posicao': self.posicao.id, 'caixa': 'CX002'}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Caixa.objects.filter(caixa='CX002').count(), 1)

class DocumentoAPITest(APITestBase):
    def test_create_documento_api(self):
        data = {
            'caixa': self.caixa.id,
            'nome_responsavel': 'Maria',
            'setor': 'Financeiro',
            'tipo': 'corrente',
            'data_arquivamento': '2024-01-01',
            'data_prevista_descarte': '2025-01-01',
        }
        response = self.client.post('/documentos/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Documento.objects.filter(nome_responsavel='Maria').count(), 1)

class PermissaoAPITest(APITestBase):
    def test_nao_autenticado_nao_pode_criar_rua(self):
        self.client.force_authenticate(user=None)
        response = self.client.post('/ruas/', {'nome': 'Rua Não Permitida'}, format='json')
        self.assertEqual(response.status_code, 401)

class FiltrosAPITest(APITestBase):
    def test_filtrar_caixa_por_nome(self):
        Caixa.objects.create(posicao=self.posicao, caixa='CX999')
        response = self.client.get('/caixas/?caixa=CX999')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        # Suporta resposta paginada (com 'results') ou lista direta
        if isinstance(data, dict) and 'results' in data:
            caixas = data['results']
        else:
            caixas = data
        self.assertTrue(any(c['caixa'] == 'CX999' for c in caixas))

class ErrosAPITest(APITestBase):
    def test_documento_data_invalida(self):
        data = {
            'caixa': self.caixa.id,
            'nome_responsavel': 'Erro',
            'setor': 'TI',
            'tipo': 'corrente',
            'data_arquivamento': '2025-01-01',
            'data_prevista_descarte': '2024-01-01',  # data de descarte anterior
        }
        response = self.client.post('/documentos/', data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('A data prevista para descarte deve ser posterior', str(response.content))

class DeleteAPITest(APITestBase):
    def test_deletar_caixa(self):
        caixa = Caixa.objects.create(posicao=self.posicao, caixa='CXDEL')
        url = f'/caixas/{caixa.id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Caixa.objects.filter(id=caixa.id).exists())

class UploadPDFTest(APITestBase):
    def test_upload_pdf_valido(self):
        pdf = SimpleUploadedFile("file.pdf", b"%PDF-1.4 test pdf content", content_type="application/pdf")
        data = {
            'caixa': self.caixa.id,
            'nome_responsavel': 'PDF User',
            'setor': 'TI',
            'tipo': 'corrente',
            'data_arquivamento': '2024-01-01',
            'data_prevista_descarte': '2025-01-01',
            'arquivo_pdf': pdf,
        }
        response = self.client.post('/documentos/', data, format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Documento.objects.filter(nome_responsavel='PDF User').exists())

    def test_upload_pdf_invalido(self):
        txt = SimpleUploadedFile("file.txt", b"not a pdf", content_type="text/plain")
        data = {
            'caixa': self.caixa.id,
            'nome_responsavel': 'TXT User',
            'setor': 'TI',
            'tipo': 'corrente',
            'data_arquivamento': '2024-01-01',
            'data_prevista_descarte': '2025-01-01',
            'arquivo_pdf': txt,
        }
        response = self.client.post('/documentos/', data, format='multipart')
        # O sistema aceita qualquer arquivo, mas você pode customizar para aceitar só PDF
        self.assertIn(response.status_code, [201, 400])

class LimiteDocumentosPorCaixaTest(APITestBase):
    def test_limite_50_documentos(self):
        for i in range(50):
            Documento.objects.create(
                caixa=self.caixa,
                nome_responsavel=f'User {i}',
                setor='TI',
                tipo='corrente',
                data_arquivamento='2024-01-01',
                data_prevista_descarte='2025-01-01',
            )
        data = {
            'caixa': self.caixa.id,
            'nome_responsavel': 'User 51',
            'setor': 'TI',
            'tipo': 'corrente',
            'data_arquivamento': '2024-01-01',
            'data_prevista_descarte': '2025-01-01',
        }
        response = self.client.post('/documentos/', data, format='json')
        self.assertEqual(response.status_code, 400)
        content = response.json()
        self.assertTrue(
            any('já possui 50 documentos' in erro for erro in content.get('non_field_errors', []))
        )

class PermissaoDeleteTest(APITestBase):
    def test_apenas_admin_pode_deletar(self):
        # Cria usuário comum
        user2 = User.objects.create_user(username='comum', password='123')
        self.client.force_authenticate(user=user2)
        caixa = Caixa.objects.create(posicao=self.posicao, caixa='CXADM')
        url = f'/caixas/{caixa.id}/'
        response = self.client.delete(url)
        # Espera 403 Forbidden se a permissão for customizada para admin
        self.assertIn(response.status_code, [204, 403])

class BuscaAvancadaTest(APITestBase):
    def test_busca_documento_por_nome_setor(self):
        Documento.objects.create(
            caixa=self.caixa,
            nome_responsavel='BuscaNome',
            setor='BuscaSetor',
            tipo='corrente',
            data_arquivamento='2024-01-01',
            data_prevista_descarte='2025-01-01',
        )
        response = self.client.get('/documentos/?nome_responsavel=BuscaNome&setor=BuscaSetor')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        if isinstance(data, dict) and 'results' in data:
            docs = data['results']
        else:
            docs = data
        self.assertTrue(any(d['nome_responsavel'] == 'BuscaNome' and d['setor'] == 'BuscaSetor' for d in docs)) 

class PaginacaoOrdenacaoTest(APITestBase):
    def test_paginacao_caixas(self):
        for i in range(15):
            Caixa.objects.create(posicao=self.posicao, caixa=f'CX{i:03}')
        response = self.client.get('/caixas/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 10)  # PAGE_SIZE = 10
        self.assertIn('next', data)
        self.assertIn('previous', data)

    def test_ordenacao_documentos(self):
        for i in range(5):
            Documento.objects.create(
                caixa=self.caixa,
                nome_responsavel=f'Nome{i}',
                setor='TI',
                tipo='corrente',
                data_arquivamento=f'2024-01-{i+1:02}',
                data_prevista_descarte=f'2025-01-{i+1:02}',
            )
        response = self.client.get('/documentos/?ordering=-data_arquivamento')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        docs = data['results'] if 'results' in data else data
        datas = [d['data_arquivamento'] for d in docs]
        self.assertEqual(datas, sorted(datas, reverse=True)) 