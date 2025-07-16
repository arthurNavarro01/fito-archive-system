from django.db import models

class Rua(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Estante(models.Model):
    rua = models.ForeignKey(Rua, on_delete=models.CASCADE)
    bloco = models.CharField(max_length=10)

    def __str__(self):
        return f"Bloco {self.bloco} - {self.rua.nome}"

class Andar(models.Model):
    estante = models.ForeignKey(Estante, on_delete=models.CASCADE)
    andar = models.IntegerField()

    def __str__(self):
        return f"Andar {self.andar} - {self.estante}"

class Posicao(models.Model):
    andar = models.ForeignKey(Andar, on_delete=models.CASCADE)
    posicao = models.IntegerField()

    def __str__(self):
        return f"Posição {self.posicao} - {self.andar}"

class Caixa(models.Model):
    posicao = models.ForeignKey(Posicao, on_delete=models.CASCADE)
    caixa = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.caixa

class Documento(models.Model):
    caixa = models.ForeignKey(Caixa, on_delete=models.CASCADE)
    nome_responsavel = models.CharField(max_length=100)
    setor = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=[('corrente', 'Corrente'), ('intermediario', 'Intermediário')])
    data_arquivamento = models.DateField()
    data_prevista_descarte = models.DateField()
    arquivo_pdf = models.FileField(upload_to='documentos/', blank=True, null=True)

    def __str__(self):
        return f"{self.nome_responsavel} - {self.setor}" 