<script lang="ts">
    export let button: ButtonData;
</script>

<a class="button-href" href="{button.href}" target="_blank" rel="noopener noreferrer" title="{button.title}">
	<img src="/button/{button.id}.png" alt="{button.alt}" width="88px" height="31px">
</a>

<style>
.button-href {
	margin: 2pt;
	display: inline-block;
}
</style>
