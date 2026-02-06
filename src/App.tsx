import { useState, useEffect } from "react";
import { Check, ChevronDown, Zap, TrendingUp, Cpu, Users, ArrowRight } from "lucide-react";
import { PremiumCountdown } from "./components/PremiumCountdown";

/**
 * Landing Page: Ganhe Dinheiro no Seu Tempo Livre com IA
 * Versão Simplificada para Lovable
 */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  // CTA countdown starts at 01:13:36 (HH:MM:SS)
  const [ctaSecondsLeft, setCtaSecondsLeft] = useState(1 * 3600 + 13 * 60 + 36);

  const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/P104151728F";

  const IMAGE_PRELOADS = [
    "/images/hero-ai-tech.webp",
    "/images/money-growth.webp",
    "/images/productivity-ai.webp",
  ] as const;

  const FAQS = [
    {
      q: "Preciso ter experiência prévia com Inteligência Artificial ou programação?",
      a: "Não. O método foi desenhado para o iniciante completo. A IA que usamos é tão intuitiva que a parte técnica é a mais fácil. Você não precisa programar, apenas seguir o Plano de Ação de 7 Dias contido no Ebook. Se você sabe usar o WhatsApp, você já tem a experiência necessária para começar a gerar renda.",
    },
    {
      q: "Quanto tempo por dia preciso dedicar para ter resultados?",
      a: "O objetivo do método é justamente aposentar o esforço manual. Graças à IA, você pode começar a aplicar o método com apenas 1 a 2 horas por dia nas suas horas vagas. O Ebook foca em te dar a estratégia para trabalhar menos e produzir mais, garantindo que seu tempo seja investido de forma inteligente e escalável.",
    },
    {
      q: "Em quanto tempo consigo ter meu primeiro retorno financeiro?",
      a: "Muitos dos nossos alunos conseguem fechar o primeiro ciclo de vendas ou conquistar o primeiro cliente em menos de 7 dias após aplicar o Plano de Ação do Ebook. O método é focado em gerar caixa rápido através de serviços e produtos digitais de baixo atrito. O retorno depende da sua aplicação, mas a estrutura está pronta para resultados imediatos.",
    },
    {
      q: "O preço não está muito baixo? Será que o conteúdo é de qualidade?",
      a: "O preço atual é uma oferta promocional de lançamento por tempo extremamente limitado. Nosso foco é que o máximo de pessoas tenha acesso a essa tecnologia agora, antes que o mercado se sature. O valor do conhecimento contido no Ebook, que pode te ensinar a gerar milhares de reais em renda extra, é inestimável. Você está fazendo um investimento de baixíssimo risco para um potencial de retorno altíssimo.",
    },
    {
      q: "E se eu comprar e o método não funcionar para mim?",
      a: "Risco Zero para Você. Temos tanta confiança no nosso método que oferecemos uma Garantia Incondicional de 7 Dias. Você tem uma semana inteira para acessar o Ebook, aplicar o Plano de Ação de 7 Dias e comprovar o potencial do método. Se você não gostar, achar que não é para você, ou simplesmente mudar de ideia, basta nos enviar um e-mail dentro deste prazo. Devolveremos 100% do seu dinheiro, sem perguntas e sem burocracia. O risco é todo nosso.",
    },
    {
      q: "Preciso de um computador de última geração ou ferramentas pagas?",
      a: "Não. Você pode começar a aplicar o método com o celular ou computador que você já tem. O Ebook foca em ferramentas de IA que possuem versões gratuitas e funcionais (como o ChatGPT e o Canva). Você só deve considerar investir em ferramentas pagas depois que já estiver gerando renda com o método. Comece com o que você tem e escale seus ganhos.",
    },
  ] as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCtaSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // UI formatting moved to <PremiumCountdown />

  // Keep canonical URL correct in preview/published URLs.
  useEffect(() => {
    const canonicalHref = `${window.location.origin}${window.location.pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalHref);
  }, []);

  // Preload images ASAP to avoid visible loading delays.
  useEffect(() => {
    // Browser preloader hints
    IMAGE_PRELOADS.forEach((href) => {
      const selector = `link[rel="preload"][as="image"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement("link");
      link.setAttribute("rel", "preload");
      link.setAttribute("as", "image");
      link.setAttribute("href", href);
      document.head.appendChild(link);
    });

    // Warm the cache in parallel
    IMAGE_PRELOADS.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, []);

  const scrollToCta = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVsl = () => {
    document.getElementById("vsl")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* HEADER STICKY */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "card-glass" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="text-2xl font-bold text-brand-gradient">
            WealthSyncX
          </div>
          <a
            className="hotmart-cta btn-primary cta-glow-ring font-semibold py-2 px-6 rounded-md transition-all"
            href={HOTMART_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            ACESSAR O PRODUTO
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background (dark brushed metal) */}
        <div className="absolute inset-0 bg-metal -z-10" />

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          {/* Texto à Esquerda */}
          <div className="space-y-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold badge-metallic-gold">
              <Zap size={16} />
              ⏰ Comece HOJE, Ganhe AMANHÃ
            </div>

            <h1 className="text-[clamp(1.85rem,3.2vw,2.1rem)] lg:text-[clamp(2.35rem,2.4vw,2.4rem)] font-extrabold leading-[1.16] tracking-tight">
              <span className="block text-primary whitespace-nowrap text-[1.21em]">Aposente o Esforço Manual:</span>
              <span className="block mt-4 sm:mt-5 text-[0.8em]">
                 Transforme suas horas vagas em uma <span className="text-primary">Renda Escalavel com IA</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-[1.85] max-w-lg text-justify hyphens-none break-normal">
              Pare de vender suas horas por migalhas. Descubra o método de "Multiplicação Digital" que permite a qualquer iniciante criar
              ativos que trabalham 24h por dia, sem precisar de experiência técnica ou investir em ferramentas pagas.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-8">
              <div className="inline-flex flex-col items-stretch">
                <a
                  className="hotmart-cta btn-primary cta-glow-ring font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                  href={HOTMART_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACESSAR O PRODUTO
                  <ArrowRight size={20} />
                </a>

                <div className="w-full inline-flex items-center justify-center gap-2 text-[clamp(0.52rem,1.2vw,0.65rem)] text-muted-foreground mt-2 whitespace-nowrap leading-none tracking-tight">
                  <Check size={14} className="text-accent" />
                  Garantia de 7 Dias • Acesso Imediato • Pagamento Seguro
                </div>
              </div>

              <button
                className="btn-ghost font-semibold px-10 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                onClick={scrollToVsl}
              >
                Mais detalhes
              </button>
            </div>
          </div>

          {/* Imagem à Direita */}
           <div className="relative h-96 lg:h-[500px] animate-fade-in-delayed">
             <picture>
               <source srcSet="/images/hero-ai-tech.webp" type="image/webp" />
               <img
                 src="/images/hero-ai-tech.jpg"
                 alt="Pessoa usando tecnologia de inteligência artificial"
                 width={1600}
                 height={1000}
                 loading="eager"
                 decoding="async"
                 fetchPriority="high"
                 className="w-full h-full object-cover rounded-2xl shadow-2xl"
               />
             </picture>
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, hsl(0 0% 0% / 0.10) 0%, hsl(0 0% 0% / 0.35) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* VSL SECTION */}
      <section id="vsl" className="py-20 bg-band text-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Veja o passo a passo
            </h2>
            <p className="text-xl text-muted-foreground">
              6 minutos para entender o método e ver se faz sentido para você
            </p>
          </div>

          <div className="relative card-glass rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
            <div className="aspect-video relative">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/o3D7HfGhaTE?rel=0&modestbranding=1"
                title="VSL - WealthSyncX"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="card-glass rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <p className="text-muted-foreground font-semibold">Métodos práticos</p>
            </div>
            <div className="card-glass rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-primary mb-2">30–60</div>
              <p className="text-muted-foreground font-semibold">Dias para os primeiros resultados</p>
            </div>
            <div className="card-glass rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-primary mb-2">R$0</div>
              <p className="text-muted-foreground font-semibold">Investimento inicial</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA SECTION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Faixa (full-width) do título */}
          <div className="w-full">
            <h2 className="text-4xl font-bold">
              O Sistema Foi Desenhado Para Te Manter Estagnado. É Hora de Quebrar as Algemas.
            </h2>
          </div>

          {/* Texto introdutório (full-width) */}
          <p className="text-lg text-muted-foreground mt-6 mb-10 leading-relaxed text-left">
            O mundo mudou, mas você ainda está jogando com as regras de <strong>1990</strong>. Trocar tempo por dinheiro é a forma mais lenta e dolorosa de buscar liberdade. Se você não tem um sistema que trabalha enquanto você dorme, você trabalhará até o dia em que não puder mais.
          </p>

          {/* Grid mantém Cenário A/B e imagem como estão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="card-glass rounded-xl p-6 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">
                  Cenário A: A Prisão do Salário Fixo
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Você acorda, entrega suas <strong>melhores horas</strong> para o sonho de outra pessoa e recebe apenas o suficiente para sobreviver e repetir o ciclo amanhã. Sua energia acaba, mas as contas não. Você quer uma renda extra, mas o <strong>cansaço</strong> é seu maior inimigo.
                </p>
              </div>

              <div className="card-glass rounded-xl p-6 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">
                  Cenário B: A Paralisia do Iniciante
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Você vê todos ganhando dinheiro na internet, tenta começar, mas se afoga em ferramentas complexas e cursos que não chegam a lugar nenhum. Você sente que chegou tarde demais para a festa.
                </p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl card-glass">
              <picture>
                <source srcSet="/images/money-growth.webp" type="image/webp" />
                <img
                  src="/images/money-growth.jpg"
                  alt="Crescimento de Renda"
                  width={1200}
                  height={900}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Card IA (full-width) */}
          <div className="card-glass rounded-2xl p-8 border-l-4 border-primary mt-10">
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              A Inteligência Artificial não é sobre tecnologia. É sobre{" "}
              <span className="font-extrabold text-primary tracking-wide">RECUPERAR O SEU TEMPO</span>.
              Enquanto a maioria teme ser substituída pela IA, uma <strong>elite silenciosa</strong> está usando essa mesma tecnologia para “clonar” sua capacidade produtiva e criar fontes de lucro que não exigem sua presença física.
            </p>
          </div>

          {/* Frase final (centralizada) */}
          <p className="text-lg text-muted-foreground leading-relaxed text-center mt-6">
            <strong>Você não precisa</strong> trabalhar mais duro. Você precisa de uma <strong>alavanca</strong>. E eu acabo de te entregar o mapa dessa alavanca.
          </p>
        </div>
      </section>

      {/* SOLUÇÃO SECTION */}
      <section className="py-20 bg-soft">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-last lg:order-first card-glass">
              <picture>
                <source srcSet="/images/productivity-ai.webp" type="image/webp" />
                <img
                  src="/images/productivity-ai.jpg"
                  alt="Produtividade com IA"
                  width={1200}
                  height={900}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Existe Uma Forma Melhor: Trabalhe Menos, Ganhe Mais
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Imagine um assistente incansável que trabalha 24 horas por dia, nunca tira férias, não comete erros e custa praticamente nada. Isso é a inteligência artificial moderna.
              </p>

              <div className="space-y-4">
                {[
                  "IA não é ficção científica — é acessível HOJE",
                  "Ferramentas gratuitas para começar (ChatGPT, Canva, Make)",
                  "Qualquer pessoa pode usar — sem conhecimento técnico",
                  "Resultados em 30-60 dias com método prático",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <Check size={14} className="text-white" />
                    </div>
                    <p className="text-lg text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPORTUNIDADE SECTION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            A Janela de Oportunidade
          </h2>
           <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
             O mercado de IA hoje é uma terra de ninguém. É a corrida do ouro, e você acaba de encontrar o mapa. Em dois anos, todos saberão usar essas ferramentas. Hoje? Hoje você é o mestre em um mundo de aprendizes. Quem chega primeiro bebe água limpa.
           </p>

          <div className="card-glass rounded-2xl p-8 mb-12">
            <p className="text-2xl font-bold mb-4">
              "Em 2008, saber fazer um site era um superpoder. Em 2024, é básico. Com IA, estamos em 2008 ainda."
            </p>
            <p className="text-lg text-muted-foreground">
              Quem aprende agora sai na frente e estabelece autoridade antes de o mercado ficar saturado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Mais Oportunidades", desc: "Que competidores qualificados" },
              { icon: Cpu, title: "Diferencial Real", desc: "Dominar IA é um superpoder" },
              { icon: Users, title: "Começar HOJE", desc: "6 meses à frente da concorrência" },
            ].map((item, i) => (
              <div key={i} className="card-glass rounded-lg p-6">
                <item.icon size={32} className="text-primary mb-4 mx-auto" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI APRENDER */}
      <section className="py-20 bg-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            O que você vai desbloquear com este Mapa✨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "1",
                title: "A Chave da Escala",
                desc: "O segredo para parar de trocar tempo por dinheiro e construir um sistema que trabalha para você 24 horas por dia.",
              },
              {
                num: "2",
                title: "IA Descomplicada",
                desc: "Entenda o que a Inteligência Artificial realmente faz (e o que não faz) em 15 minutos, sem jargões técnicos ou complicação.",
              },
              {
                num: "3",
                title: "O Caminho dos Iniciantes",
                desc: "Veja 3 estudos de caso de pessoas comuns que usaram o método para gerar renda extra, e descubra o nicho de maior potencial para você.",
              },
              {
                num: "4",
                title: "O Plano de Ataque",
                desc: "A estratégia exata para escolher entre Renda Ativa (caixa rápido) e Renda Escalável (liberdade), e como a IA acelera as duas.",
              },
              {
                num: "5",
                title: "Seu Kit de Sobrevivência",
                desc: "As 3 ferramentas de IA gratuitas que você precisa para começar hoje, sem gastar um centavo e sem sobrecarga de informação.",
              },
              {
                num: "6",
                title: "O Plano de Ação de 7 Dias",
                desc: "O passo a passo prático, dia a dia, para ir do zero à sua primeira venda ou cliente em apenas uma semana.",
              },
              {
                num: "7",
                title: "A Janela de Ouro",
                desc: "Por que quem age agora sai na frente e estabelece autoridade, e como você pode aproveitar o \"efeito 2008\" da internet.",
              },
              {
                num: "8",
                title: "Compra de Risco Zero",
                desc: "Como você pode testar o método por 7 dias completos e ter 100% do seu dinheiro de volta se não gostar (o risco é todo nosso).",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-glass rounded-lg p-6 border-l-4 border-primary transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(190 90% 45%), hsl(262 83% 58%))" }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Pessoas Reais, Resultados Reais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Comecei do zero e em 60 dias já estava ganhando. Agora trabalho 2 horas por dia.",
                author: "Ana M.",
                role: "Professora",
              },
              {
                quote: "Não sou tech-savvy, mas o ebook explicou de forma tão simples que consegui implementar em uma semana.",
                author: "Carlos R.",
                role: "Ex-Vendedor",
              },
              {
                quote: "O melhor foi descobrir que não preciso aparecer. Ganho dinheiro nos bastidores.",
                author: "Aisha S.",
                role: "Dona de Casa",
              },
              {
                quote: "Esperava gastar muito, mas comecei com ferramentas gratuitas. Só depois investi.",
                author: "João P.",
                role: "Iniciante",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-glass rounded-lg p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-primary">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg text-muted-foreground mb-4 italic">"{item.quote}"</p>
                <div>
                  <p className="font-bold">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-soft">
        <div className="container mx-auto px-4 max-w-3xl">
          <script
            type="application/ld+json"
            // JSON-LD must be raw JSON string
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <h2 className="text-4xl font-bold text-center mb-12">
            Suas Dúvidas Respondidas
          </h2>

          <div className="space-y-4">
            {FAQS.map((item, i) => (
              <details
                key={i}
                className="group card-glass rounded-lg p-6 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">
                  {item.q}
                  <ChevronDown
                    size={20}
                    className="group-open:rotate-180 transition-transform"
                  />
                </summary>
                <p className="mt-4 text-faq-answer leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="py-20 bg-band text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-6">
            O Código Foi Quebrado. Você Vai Ficar de Fora?
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Pense por um instante:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
              <div className="card-glass rounded-2xl p-6 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-3">DE UM LADO</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A frustração de trocar horas por um salário fixo, a sensação de estar sempre correndo atrás de um sonho e,
                  no final de tudo, as contas não batem.
                </p>
              </div>
              <div className="card-glass rounded-2xl p-6 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-3">DO OUTRO LADO</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A tranquilidade de ter um sistema de renda que trabalha por você, a liberdade de usar suas horas vagas para o
                  que realmente importa e a certeza de estar à frente da maior revolução tecnológica da história.
                </p>
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Você leu o mapa. Você viu o caminho. Você sabe que o preço de <strong>USD$ 9,47</strong> é um presente que não durará.
            </p>
            <p className="text-2xl font-extrabold mb-10 leading-snug">
              A <span className="text-primary">ÚNICA COISA</span> ENTRE VOCÊ E A SUA PRIMEIRA RENDA COM IA É ESTE CLIQUE.
            </p>

            {/* CONTADOR REGRESSIVO */}
            <div className="mb-10 flex flex-col items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground">Oferta encerra em</span>
              <PremiumCountdown totalSeconds={ctaSecondsLeft} />
            </div>

             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
               <a
                 className="hotmart-cta btn-cta-premium cta-glow-ring relative w-full sm:w-auto min-w-[280px] h-14 sm:h-16 font-semibold px-10 sm:px-12 rounded-xl transition-all duration-300 flex items-center justify-center"
                 href={HOTMART_CHECKOUT_URL}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 {/* Texto principal (mantém o texto atual) + ícone */}
                 <span className="flex items-center justify-center gap-2">
                   <ArrowRight size={18} className="shrink-0" />
                   <span className="text-[0.98rem] sm:text-[1.05rem] font-extrabold tracking-wide leading-none">
                     A HORA DE AGIR É AGORA
                   </span>
                 </span>
               </a>
             </div>

            <p className="text-muted-foreground text-sm">
              • Garantia Blindada de 7 Dias • Acesso Imediato • Pagamento 100% Seguro
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background text-muted-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            © 2026 WealthSyncX. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
