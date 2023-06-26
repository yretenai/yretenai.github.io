<script lang="ts">
    export let emoji: string[];
    export let size: number = 1;
</script>

<img class="emote" src="/emote/{emoji[0]}.png" alt={emoji[1]} style:width="{size}em" style:height="{size}em"/>

<style lang="scss">
    .emote {
      vertical-align: top;
      margin: 0 5pt;
    }
</style>