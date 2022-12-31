<script lang="ts">
    export let href: string;
    export let name: string;
    export let display: string;
    export let distance: number = 400;
    export let color: boolean = false;
</script>

<div class="link-element">
    <div class="normal">
        <a {href} target="_blank">
            {#if color}
                <img src="/out/{name}.svg" alt={display}/>
            {:else}
                <div style:background-color="var(--{name}, var(--fg))" style:--webkit-mask="url('/out/{name}.svg') no-repeat center" style:mask="url('/out/{name}.svg') no-repeat center"></div>
            {/if}
            {display}
        </a>
    </div>
    <div class="orbit" style:animation-duration="{distance/100*25}s" style:width="{distance + 5}pt" style:height="{distance + 5}pt" style:left="-{distance/2}pt" style:top="-{distance/2}pt">
        <a class="dot" {href} target="_blank" style:animation-duration="{distance/100*25}s"
           data-tooltip={display}>
            {#if color}
                <img src="/out/{name}.svg" alt={display}/>
            {:else}
                <div style:background-color="var(--{name}, var(--fg))" style:--webkit-mask="url('/out/{name}.svg') no-repeat center" style:mask="url('/out/{name}.svg') no-repeat center"></div>
            {/if}
        </a>
    </div>
</div>

<style lang="scss">
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes counter-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  .orbit {
    animation: rotate linear infinite;
    display: inline-block;
    position: absolute;
    pointer-events: none;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      border: 1pt dashed var(--fg);
      display: block;
      border-radius: 50%;
      z-index: -1;
      position: absolute;
    }

    .dot {
      pointer-events: all;
      animation: counter-rotate linear infinite;
      display: block;
      width: 25pt;
      height: 25pt;
      background: var(--bg);
      border: 5pt var(--bg) solid;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-left: -16pt;
      margin-top: -16pt;
      z-index: 100;

      &::before {
        content: attr(data-tooltip);
        position: absolute;
        top: -29pt;
        left: 100%;
        background: var(--bg);
        display: none;
        padding: 3pt 10pt;
        border-radius: 3pt;
        border: 1pt dashed var(--fg);
        z-index: 100;
      }

      &:hover::before {
        display: block;
      }
    }
  }

  .dot div, .normal div {
    width: 25pt;
    height: 25pt;
    -webkit-mask: url('') no-repeat center 25pt;
    mask: url('') no-repeat center 25pt;
  }

  .normal {
    display: none;
    margin: 10pt 0;

    div {
      display: inline-block;
    }

    div, img {
      vertical-align: middle;
      margin-right: 5pt;
    }
  }

  @media (prefers-reduced-motion) {
    .orbit, .dot {
      animation: none !important;
    }
  }


  @media (max-width: 1000pt) {
    .orbit {
      display: none;
    }

    .normal {
      display: block;
    }
  }
</style>
