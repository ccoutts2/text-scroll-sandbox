"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const clients = [
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
  {
    client: "wedd1",
    logo: "logo 1",
  },
];

export default function Home() {
  const container = useRef(null);
  const stickyBar = useRef(null);
  const footerTrigger = useRef(null);
  const rows = useRef([]);
  const footerTriggerHeight = footerTrigger.current?.offsetHeight || 0;

  function useScrollTriggerAnimation(refs) {
    useGSAP(
      () => {
        gsap.registerPlugin(ScrollTrigger);

        function getStickyBarCenter() {
          const stickyBar = document.querySelector(".sticky-bar");
          return stickyBar.offsetTop + stickyBar.offsetHeight / 2;
        }

        refs.current.forEach((row, index) => {
          ScrollTrigger.create({
            trigger: row,
            start: () => `top+=${getStickyBarCenter() - 450} center`,
            end: () => `top+=${getStickyBarCenter() - 350} center`,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const maxGap = window.innerWidth < 900 ? 10 : 15;
              const minGap = window.innerWidth < 900 ? 0.5 : 1;
              const currentGap = minGap + (maxGap - minGap) * progress;
              row.style.gap = `${currentGap}em`;
            },
          });

          ScrollTrigger.create({
            trigger: row,
            start: () => `top+=${getStickyBarCenter() - 400} center`,
            end: () => `top+=${getStickyBarCenter() - 300} center`,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const maxGap = window.innerWidth < 900 ? 0.5 : 1;
              const minGap = window.innerWidth < 900 ? 10 : 15;
              const currentGap = minGap + (maxGap - minGap) * progress;
              row.style.gap = `${currentGap}em`;
            },
          });
        });

        ScrollTrigger.create({
          trigger: footerTrigger.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const startTop = 50;
            const endTop = 92;
            const newTop = startTop + (endTop - startTop) * self.progress;
            stickyBar.current.style.top = `${newTop}%`;
          },
        });

        ScrollTrigger.create({
          trigger: footerTrigger.current,
          start: () =>
            `top+=${footerTriggerHeight - (window.innerHeight + 100)} bottom`,
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const fontSizeStart = window.innerWidth < 900 ? 2.5 : 1.25;
            const fontSizeEnd = 9;
            const newFontSize =
              fontSizeStart + (fontSizeEnd - fontSizeStart) * self.progress;
            stickyBar.current.querySelectorAll("p").forEach((p) => {
              p.style.fontSize = `${newFontSize}vw`;
            });
          },
        });
      },
      { scope: container }
    );
  }

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useScrollTriggerAnimation(rows);

  return (
    <div ref={container} className="container">
      <div ref={stickyBar} className="sticky-bar">
        <div className="item">
          <p>e</p>
        </div>
        <div className="item">
          <p>w</p>
        </div>
        <div className="item">
          <p>m</p>
        </div>
      </div>

      <section className="hero">
        <img src="/assets/hero.jpg" alt="" />
      </section>

      <section className="clients">
        {clients.map((client, i) => (
          <div ref={(el) => (rows.current[i] = el)} key={i} className="row">
            <div className="logo">
              <p>{client.client}</p>
            </div>
            <div className="logo">
              <p>{client.logo}</p>
            </div>
          </div>
        ))}
      </section>

      <section ref={footerTrigger} className="trigger-footer">
        <img src="/assets/footer.jpg" alt="" />
      </section>
    </div>
  );
}
