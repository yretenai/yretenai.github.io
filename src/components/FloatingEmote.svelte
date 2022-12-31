<script lang="ts">
    import type {EventHandler} from "svelte/elements";
    import Emote from "./Emote.svelte";

    export let done : EventHandler;
    export let emoji: string;

    function deleteSelf(event: AnimationEvent) {
        if (event.animationName.endsWith("move")) {
            done(event);
        }
    }

    const size = (Math.random() * (Math.random() > 0.99 ? 20 : 2)) + 1;
    const opacity = size > 4 ? 0.75 : Math.min(2, size - 1) / 2 * 0.3 + Math.random() * 0.2;
</script>

<div style:top="{Math.random() * 120-10}vh" style:animation-delay="{Math.random() * 2.5}s,0s" style:animation-duration="{(Math.random() - 0.5) * 2 + 5}s,{(Math.random() - 0.5) * 5 + 30}s" style:opacity="{opacity}" on:animationend={deleteSelf}>
    <Emote {emoji} {size}></Emote>
</div>

<style>
    div {
        position: absolute;
        animation: 5s sine infinite ease-in-out alternate, 30s move 1 linear;
    }

    @keyframes move {
        from {
            left: 100vw;
        }
        to {
            left: -100%;
        }
    }

    @keyframes sine {
        from {
            margin-top: 0;
        }
        to {
            margin-top: 10vh;
        }
    }
</style>