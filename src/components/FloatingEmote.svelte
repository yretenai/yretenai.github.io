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
</script>

<div style:top="{Math.random() * 120-10}vh" on:animationend={deleteSelf}>
    <Emote {emoji} size="{Math.random() * 2 + 0.5}"></Emote>
</div>

<style>
    div {
        position: absolute;
        animation: 5s sine infinite ease-in-out alternate, 30s move 1 linear;
        opacity: 50%;
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