<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';

	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	const avatar = $page.data.session?.user?.image as string | undefined;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">ToDos</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $page.data.session}
					<Avatar src={avatar} width="w-14" rounded="rounded-full" />
					<button on:click={() => signOut()} class="button">Sign out</button>
				{:else}
					<button on:click={() => signIn()} class="button">Sign in</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
