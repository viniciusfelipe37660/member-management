Aqui está um prompt completo e detalhado para usar no Claude Code:

---

```
Você é um desenvolvedor Full Stack sênior. Desenvolva um sistema completo de Gestão de Membros seguindo todas as especificações abaixo. O autor do projeto é Vinícius Felipe.

---

## VISÃO GERAL DO PROJETO

Sistema de Gestão de Membros com backend em Java/Spring Boot e frontend em TypeScript/React. O projeto deve estar 100% funcional, com código limpo, bem organizado e pronto para apresentação em entrevista técnica.

---

## ESTRUTURA DE PASTAS

```
member-management/
├── backend/          # Spring Boot (Java)
├── frontend/         # React + TypeScript
└── README.md
```

---

## BACKEND — Java com Spring Boot

### Setup
- Java 17+
- Spring Boot 3.x
- Banco de dados: H2 (in-memory, relacional)
- Build tool: Maven
- Dependências: Spring Web, Spring Data JPA, H2 Database, Validation, Lombok

### Entidade: Member
Campos:
- id: Long (PK, auto-increment)
- name: String (não nulo, não vazio)
- cpf: String (armazenado APENAS como números, único, não nulo)
- birthDate: LocalDate (não nulo)
- active: boolean (default true)

### Regras de Negócio no Backend
1. **Idade mínima**: Calcular a partir do birthDate — bloquear cadastro se a pessoa tiver menos de 18 anos completos na data atual.
2. **Validação de CPF**:
   - Implementar o algoritmo de validação de CPF brasileiro (cálculo dos dois dígitos verificadores).
   - Antes de salvar, remover todos os caracteres não numéricos do CPF recebido.
   - Verificar unicidade do CPF no banco (retornar erro claro se duplicado).
3. **Status**: Campo `active` pode ser alternado (ativar/desativar membro).

### Camadas
- **Entity**: `Member.java`
- **Repository**: `MemberRepository.java` (Spring Data JPA)
- **DTO**: `MemberRequestDTO.java` e `MemberResponseDTO.java`
- **Service**: `MemberService.java` — toda lógica de negócio aqui
- **Controller**: `MemberController.java` — REST API
- **Exception**: `GlobalExceptionHandler.java` com `@RestControllerAdvice` para retornar mensagens de erro padronizadas em JSON: `{ "field": "cpf", "message": "CPF inválido." }`
- **Validator**: `CpfValidator.java` — algoritmo de validação do CPF

### Endpoints REST
- `GET /api/members` — listar todos os membros
- `GET /api/members/{id}` — buscar membro por ID
- `POST /api/members` — criar membro
- `PUT /api/members/{id}` — atualizar membro
- `DELETE /api/members/{id}` — remover membro
- `PATCH /api/members/{id}/toggle-status` — ativar/desativar membro

### Configuração H2
Em `application.properties`:
```
spring.datasource.url=jdbc:h2:mem:membersdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
server.port=8080
```

### CORS
Configurar CORS para permitir requisições do frontend em `http://localhost:5173`.

### Tratamento de Erros
Todos os erros devem retornar JSON com mensagem legível:
- CPF inválido → 400 Bad Request: `"CPF inválido."`
- CPF duplicado → 409 Conflict: `"CPF já cadastrado."`
- Menor de 18 anos → 400 Bad Request: `"O membro deve ter no mínimo 18 anos."`
- Membro não encontrado → 404 Not Found: `"Membro não encontrado."`

---

## FRONTEND — React + TypeScript

### Setup
- Vite + React + TypeScript
- Gerenciador de pacotes: npm
- Estilização: Tailwind CSS
- HTTP client: axios

### Funcionalidades
1. **Listagem de membros** (`/` ou `/members`):
   - Tabela com colunas: Nome, CPF (formatado como 000.000.000-00), Data de Nascimento, Status (badge visual verde=Ativo / vermelho=Inativo), Ações
   - **Estado vazio**: quando não há membros, exibir ilustração/ícone com a mensagem "Nenhum membro cadastrado ainda. Clique em 'Novo Membro' para começar."
   - Botão "Novo Membro" que abre o formulário/modal
   - Botão de toggle de status (ativar/desativar) em cada linha
   - Botão de editar e excluir em cada linha

2. **Formulário de Cadastro/Edição** (modal ou página separada):
   - Campos: Nome completo, CPF, Data de Nascimento, Status (checkbox ativo/inativo)
   - **Campo CPF**: aplicar máscara automática enquanto o usuário digita (000.000.000-00), mas enviar apenas os números para a API
   - **Validações no frontend** (antes de enviar):
     - Nome obrigatório
     - CPF deve estar completamente preenchido
     - Data de nascimento obrigatória
   - **Alertas de erro da API**: exibir mensagens de erro retornadas pelo backend de forma destacada (toast ou alerta inline com cor vermelha)
   - **Feedback de sucesso**: toast ou alerta verde ao cadastrar/editar com sucesso

3. **UX**:
   - Loading spinner enquanto carrega dados
   - Confirmação antes de deletar membro
   - Responsivo (funcionar bem em telas menores)

### Estrutura de pastas do frontend
```
src/
├── components/
│   ├── MemberForm.tsx
│   ├── MemberList.tsx
│   ├── MemberTable.tsx
│   ├── EmptyState.tsx
│   └── StatusBadge.tsx
├── services/
│   └── api.ts          # configuração do axios + chamadas à API
├── types/
│   └── member.ts       # interfaces TypeScript
├── hooks/
│   └── useMembers.ts   # hook customizado para gerenciar estado dos membros
└── App.tsx
```

### Tipos TypeScript
```typescript
interface Member {
  id: number;
  name: string;
  cpf: string;
  birthDate: string; // formato: YYYY-MM-DD
  active: boolean;
}

interface MemberRequest {
  name: string;
  cpf: string;        // apenas números
  birthDate: string;
  active: boolean;
}

interface ApiError {
  field?: string;
  message: string;
}
```

---

## README.md (na raiz do projeto)

Criar um README.md completo e profissional contendo:

```markdown
# Member Management System

Sistema de Gestão de Membros desenvolvido como desafio técnico para vaga de Estágio Full Stack.

**Autor:** Vinícius Felipe

## Tecnologias

**Backend:** Java 17, Spring Boot 3, H2 Database, Maven  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios

## Pré-requisitos

- Java 17+
- Node.js 18+
- npm

## Como rodar

### Backend

```bash
cd backend
./mvnw spring-boot:run
```
API disponível em: http://localhost:8080  
Console H2: http://localhost:8080/h2-console

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Aplicação disponível em: http://localhost:5173

## Regras de Negócio Implementadas

- Restrição de idade: apenas maiores de 18 anos
- Validação de CPF (algoritmo oficial brasileiro)
- CPF único no sistema, armazenado somente como números
- Membro pode ser ativado ou desativado
- Alertas claros para todos os erros de validação
```

---

## INSTRUÇÕES GERAIS

1. Crie todos os arquivos do projeto do zero, incluindo `pom.xml`, `application.properties`, todos os `.java`, todos os `.tsx`/`.ts`, `package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, etc.
2. O código deve compilar e rodar sem erros.
3. Preste atenção especial ao algoritmo de validação do CPF — implemente o cálculo dos dois dígitos verificadores corretamente.
4. O frontend deve tratar erros da API e nunca deixar o usuário sem feedback.
5. Use commits organizados durante o desenvolvimento (mensagens em inglês, convencionais: feat:, fix:, chore:).
6. Todo o código deve estar em inglês (variáveis, métodos, comentários), exceto as mensagens exibidas ao usuário final que podem estar em português.

Comece pelo backend, depois o frontend, e por fim o README.md.
```

---

**Dica de uso:** Cole esse prompt direto no Claude Code na raiz de uma pasta vazia chamada `member-management`. Ele vai gerar tudo do zero. Depois é só criar o repositório no GitHub, dar `git init`, e fazer os commits.

O prazo é 15/05 — você está bem dentro do tempo. Boa sorte na vaga!