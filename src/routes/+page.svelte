<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="my-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to ToDos</h2>
		{#if !$page.data.session}
			<p>Sign in to make some ToDos</p>
		{:else}
			<a class="btn variant-filled" href="/todos"> Todos </a>
		{/if}
	</div>
</div>
