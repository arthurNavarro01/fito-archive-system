from django.contrib import admin
from .models import Rua, Estante, Andar, Posicao, Caixa, Documento

admin.site.register(Rua)
admin.site.register(Estante)
admin.site.register(Andar)
admin.site.register(Posicao)
admin.site.register(Caixa)
admin.site.register(Documento) 