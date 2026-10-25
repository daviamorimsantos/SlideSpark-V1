# NotaPronta — encomendas de sites de apresentação

Esta versão transforma o NotaPronta em uma página de encomendas. O cliente informa o tema, seleciona as preferências, vê um orçamento estimado e envia um relatório pré-preenchido para o WhatsApp do responsável. O site **não gera nem publica automaticamente o trabalho**.

## Fluxo
1. O cliente preenche o diagnóstico.
2. O orçamento estimado é calculado entre R$ 20 e R$ 45 conforme tamanho, profundidade, recursos e urgência.
3. Ao enviar, abre `https://wa.me/5577999702260` com o relatório pronto. O cliente precisa confirmar o envio no WhatsApp.
4. O responsável negocia os detalhes e o pagamento no privado.
5. Depois do pagamento, o site exclusivo do trabalho é desenvolvido e entregue separadamente.

## Publicação
- Pode ser hospedado como site estático no GitHub Pages ou Vercel.
- Não precisa de chave de IA nem backend para o formulário e o cálculo de orçamento.
- Para mudar o WhatsApp, edite `WHATSAPP_NUMBER` em `app.js`. Formato internacional: apenas dígitos, com DDI e DDD.

## Observações
- O orçamento é uma estimativa ilustrativa; ajuste a regra de preços em `getData()` no `app.js` conforme seus valores comerciais.
- O botão de envio abre o WhatsApp, mas não envia mensagens silenciosamente.
- O formulário não processa pagamento, não cria conta e não cria automaticamente o site final.


O formulário permite selecionar trabalho individual ou em grupo. Ao escolher grupo, os nomes dos participantes são obrigatórios e aparecem no resumo e no relatório enviado pelo WhatsApp.
