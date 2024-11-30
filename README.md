# Bloco de Notas

Este é um projeto de um bloco de notas desenvolvido em JavaScript, HTML e CSS. O bloco de notas permite criar, editar, duplicar, apagar, pesquisar notas e fazer o download de todas as notas em um arquivo CSV. Os dados são salvos no `localStorage` para persistência.

## Funcionalidades

### 1. **Salvar Notas no Local Storage**
As notas são armazenadas no `localStorage`, garantindo que permaneçam salvas mesmo após o recarregamento da página.

### 2. **Adicionar Notas**
É possível adicionar novas notas digitando o conteúdo no campo de entrada e clicando no botão `Adicionar Nota` ou pressionando `Enter`.

### 3. **Editar Notas**
As notas podem ser editadas diretamente no campo de texto. As alterações são automaticamente salvas.

### 4. **Duplicar Notas**
Cada nota tem um botão para duplicar, criando uma nova nota com o mesmo conteúdo.

### 5. **Apagar Notas**
As notas podem ser apagadas clicando no botão de exclusão correspondente.

### 6. **Pesquisar Notas**
A funcionalidade de pesquisa filtra as notas pelo conteúdo à medida que o usuário digita no campo de pesquisa.

### 7. **Exportar Notas para CSV**
As notas podem ser exportadas como um arquivo CSV, contendo ID, conteúdo e estado de fixação.

---

## Estrutura do Código

### Principais Componentes:

1. **HTML**
   - Contém a estrutura básica para o contêiner das notas, o campo de entrada e os botões de ação.

2. **CSS**
   - Estiliza os elementos da interface, como notas fixadas, campos de texto, ícones e botões.

3. **JavaScript**
   - Gerencia toda a lógica, incluindo:
     - Manipulação do DOM
     - Gerenciamento de eventos
     - Persistência no `localStorage`
     - Geração de arquivos CSV

---

## Como utilizar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/bloco-de-notas.git
