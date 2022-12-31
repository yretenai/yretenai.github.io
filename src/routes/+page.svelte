<script lang="ts">
    import * as data from "../data.json";
    import Emote from "../components/Emote.svelte";
    import Orbit from "../components/Orbit.svelte";
    import FloatingEmote from "../components/FloatingEmote.svelte";
    import * as svelte from "svelte";

    svelte.onMount(() => {
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function triggerEmote() {
            const element: FloatingEmote = new FloatingEmote({
                props: {
                    done: () => element.$destroy(),
                    emoji: data.fun.emoji[Math.floor(Math.random() * data.fun.emoji.length)],
                },
                target: document.querySelector("#gimmick")
            });

        }

        if (!noMotion.matches) {
            noMotion.addEventListener('change', () => {
                if (noMotion.matches) {
                    clearInterval(special);
                }
            })

            const special = setInterval(() => {
                if (!document.hasFocus()) {
                    return;
                }

                if (Math.random() < data.fun.rate || location.search == "?emotetest") {
                    triggerEmote();
                }
            }, location.search == "?emotetest" ? 100 : data.fun.interval);
        }
    });
</script>

<svelte:window></svelte:window>

<div id="gimmick"></div>
<div class="content">
    <div aria-hidden="true" class="neptune"></div>
    <article class="info">
        <header>
            <span>{data.name}</span>
            {#each data.flair as emoji}
                <Emote {emoji}/>
            {/each}
        </header>
        <section>
            {data.description}
        </section>
        <footer>
            {#each data.attribution as attribution}
                <a href={attribution.href} target="_blank" rel="noreferrer">{attribution.subject}</a><br/>
            {/each}
        </footer>
    </article>
    <section class="links">
        {#each data.links as link}
            <Orbit href={link.href} name={link.id} display={link.name} distance={link.distance}
                   color={link.color ?? false}/>
        {/each}
    </section>
</div>

<style lang="scss">
  :root {
    --bg: #11111B;
    --fg: #EFF1F5;
    --lavaforge: #ff8066;
    --pronoun: #ff95bb;
    --blog: #f9e2af;
  }

  #gimmick {
    overflow: hidden;
    pointer-events: none;
    z-index: -100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    white-space: nowrap;
  }

  .content {
    top: 50vh;
    left: 50vw;
    margin-left: -300pt;
    position: absolute;
    overflow: visible;

    .neptune {
      background: url("/neptune.png") transparent no-repeat center center;
      background-size: 250pt;
      width: 512pt;
      height: 512pt;
      margin-left: -256pt;
      margin-top: -256pt;
      pointer-events: none;
    }

    .info {
      font-size: 24pt;
      position: absolute;
      width: 450pt;
      height: 300pt;
      top: -100pt;
      left: 100%;
      margin-left: 15pt;

      header {
        font-size: 1.33em;
        font-weight: bold;
      }

      article {
        font-style: italic;
      }

      footer {
        font-size: 0.6em;
        font-weight: lighter;
      }
    }
  }

  :global(a) {
    color: var(--fg);
    text-decoration: none;
    font-style: italic;

    &:hover {
      text-decoration: underline;
    }

    &:visited {
      color: var(--fg);
    }
  }

  :global(html) {
    width: 100%;
    height: 100%;
    background: var(--bg);
    font-family: 'Clarity City', 'Metropolis', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: var(--fg);
  }

  :global(body), :global(*) {
    margin: 0;
    padding: 0;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --bg: #EFF1F5;
      --fg: #11111B;
    }
  }

  @media (max-width: 1000pt) {
    .content {
      position: unset;
      overflow: unset;
      margin: 0;
      text-align: center;

      .neptune {
        position: absolute;
        margin: unset;
        top: 0;
        left: 10%;
        right: 10%;
        bottom: 0;
        background-position: center -100pt;
        background-size: contain;
        width: unset;
        height: unset;
        opacity: 0.33;
        z-index: -1;
      }

      .info {
        position: unset;
        margin: unset;
        padding: 5pt;
        left: unset;
        top: unset;
        text-align: center;
        height: auto;
        width: auto;

        footer {
          font-size: 0.4em;
        }
      }

      .links {
        padding: 15pt;
      }
    }
  }

  @media (max-width: 600pt) {
    .links {
      text-align: left;
    }
  }
</style>
