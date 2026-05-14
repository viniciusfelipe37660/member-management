# Member Management System

Sistema de Gestão de Membros desenvolvido como desafio técnico para vaga de Estágio Full Stack.

**Autor:** Vinícius Felipe

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| **Backend** | Java 17, Spring Boot 3.2, H2 Database (in-memory), Maven |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Axios |

---

## Pré-requisitos

| Ferramenta | Versão mínima | Download |
|------------|--------------|---------|
| **Java JDK** | 17 | https://adoptium.net/temurin/releases/?version=17 |
| **Node.js** | 18 | https://nodejs.org/en/download |
| **npm** | 9+ | Incluído com o Node.js |

### Verificar instalações

```bash
java -version
# Esperado: openjdk version "17.x.x"

node -v
# Esperado: v18.x.x ou superior

npm -v
# Esperado: 9.x.x ou superior
```

> **Windows:** Após instalar o Java, abra um **novo** terminal para o PATH ser atualizado.

---

## Como rodar

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd member-management
```

---

### 2. Rodar o Backend

> **Windows:** Se o projeto estiver no drive `D:`, troque para ele primeiro com `D:` antes do `cd`.

```bash
cd backend
run.cmd
```

> **Linux/Mac:**
> ```bash
> export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
> ./mvnw spring-boot:run
> ```

**Primeira execução:** o Maven baixa todas as dependências automaticamente (~2–3 min).

Aguarde a mensagem:
```
Started MemberManagementApplication in X.XXX seconds
```

**URLs disponíveis:**
- API REST: http://localhost:8080/api/members
- Console H2: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:membersdb`
  - User: `sa` | Password: *(em branco)*

---

### 3. Rodar o Frontend

Abra **outro terminal** (sem fechar o backend):

```bash
cd frontend
npm install
npm run dev
```

Aguarde:
```
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

**Acesse:** http://localhost:5173

---

## Estrutura do Projeto

```
member-management/
├── backend/
│   ├── run.cmd                            ← Script para rodar no Windows
│   ├── pom.xml
│   └── src/main/java/com/vinicius/membermanagement/
│       ├── MemberManagementApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/MemberController.java
│       ├── dto/
│       │   ├── MemberRequestDTO.java
│       │   └── MemberResponseDTO.java
│       ├── entity/Member.java
│       ├── exception/
│       │   ├── BusinessException.java
│       │   └── GlobalExceptionHandler.java
│       ├── repository/MemberRepository.java
│       ├── service/MemberService.java
│       └── validator/CpfValidator.java
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EmptyState.tsx
    │   │   ├── MemberForm.tsx
    │   │   ├── MemberList.tsx
    │   │   ├── MemberTable.tsx
    │   │   └── StatusBadge.tsx
    │   ├── hooks/useMembers.ts
    │   ├── services/api.ts
    │   ├── types/member.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/members` | Listar todos os membros |
| `GET` | `/api/members/{id}` | Buscar membro por ID |
| `POST` | `/api/members` | Criar novo membro |
| `PUT` | `/api/members/{id}` | Atualizar membro |
| `DELETE` | `/api/members/{id}` | Remover membro |
| `PATCH` | `/api/members/{id}/toggle-status` | Ativar/desativar membro |

### Exemplo de payload (POST/PUT)

```json
{
  "name": "João da Silva",
  "cpf": "52998224725",
  "birthDate": "1995-06-15",
  "active": true
}
```

---

## Regras de Negócio

- **Idade mínima:** apenas maiores de 18 anos completos podem ser cadastrados
- **Validação de CPF:** algoritmo oficial brasileiro com cálculo dos dois dígitos verificadores
- **CPF único:** cada CPF pode estar associado a apenas um membro
- **CPF armazenado somente como números:** a formatação `000.000.000-00` ocorre apenas no frontend
- **Toggle de status:** membro pode ser ativado ou desativado sem ser excluído

---

## Erros retornados pela API

| Situação | HTTP | Mensagem |
|----------|------|---------|
| CPF inválido | 400 | `"CPF inválido."` |
| CPF duplicado | 409 | `"CPF já cadastrado."` |
| Menor de 18 anos | 400 | `"O membro deve ter no mínimo 18 anos."` |
| Membro não encontrado | 404 | `"Membro não encontrado."` |

---

## Solução de Problemas (Windows)

### Java não reconhecido no terminal
Abra um **novo** terminal após instalar o Java. Se persistir, adicione manualmente ao PATH:
- `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin`

### Porta 8080 já em uso
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Porta 5173 já em uso
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```
