<script lang="ts">
	type IconType = keyof typeof icons;

	export let name: IconType;
	export let width: string;
	export let height: string;
	export let viewBoxX: number | undefined = undefined;
	export let viewBoxY: number | undefined = undefined;

	const icons = {
		home: {
			box: 24,
			svg: `
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      `
		},
		profile: {
			box: 24,
			svg: `
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      `
		},
		settings: {
			box: 24,
			svg: `
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      `
		},
		about: {
			box: 24,
			svg: `
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      `
		},
		like: {
			box: 24,
			svg: `
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      `
		},
		permalink: {
			box: 24,
			svg: `
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        `
		},
		remove: {
			box: 24,
			svg: `
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        `
		},
		signout: {
			box: 24,
			svg: `
      		<g>
		    	<path
			    	d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			    	s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			    	c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			    	C27.9,58.95,0,86.75,0,121.05z"
		    	/>
		    	<path
			    	d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			    	c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			    	C380.6,325.15,380.6,332.95,385.4,337.65z"
		    	/>
	    	</g>
      	`
		},
		loading: {
			box: 28,
			svg: `
			<defs>
				<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
					<stop stop-color="#fff" stop-opacity="0" offset="0%" />
					<stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
					<stop stop-color="#fff" offset="100%" />
				</linearGradient>
			</defs>
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)">
					<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 18 18"
							to="360 18 18"
							dur="0.9s"
							repeatCount="indefinite"
						/>
					</path>
					<circle fill="#fff" cx="36" cy="18" r="1">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 18 18"
							to="360 18 18"
							dur="0.9s"
							repeatCount="indefinite"
						/>
					</circle>
				</g>
			</g>
      	`
		}
	};

	const icon = icons[name];
</script>

<svg
	class={$$props.class}
	{width}
	{height}
	viewBox="0 0 {viewBoxX ?? icon.box} {viewBoxY ?? icon.box}"
	fill={name === 'signout' ? 'currentColor' : 'none'}
	stroke="currentColor"
>
	{@html icon.svg}
</svg>
