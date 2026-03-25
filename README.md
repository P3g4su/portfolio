# P3g4su // Portfolio


Este repositório contém o código-fonte da minha infraestrutura pessoal na web. Não é um template genérico. Foi arquitetado do zero.

## Arquitetura & Tech Stack

O sistema foi construído visando performance extrema, SEO otimizado e renderização livre de artefatos visuais (*glitches*).

* **Core:** [Next.js 15](https://nextjs.org/) (App Router para Server-Side Rendering e rotas dinâmicas).
* **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) (Utilitários de baixo nível e variáveis CSS nativas).
* **Motion & Interatividade:** [Framer Motion](https://www.framer.com/motion/) (Animações de fluxo contínuo e transições de página cinematográficas).
* **UI Hacks:** Utilização de `SVG Text Masking` e `linear-gradients` dinâmicos para iluminação volumétrica sem quebra de renderização no WebKit.
* **Database:** Arquitetura leve baseada em JSON local (`/data`) injetado dinamicamente nas rotas do servidor.
