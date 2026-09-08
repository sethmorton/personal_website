// Live figures for blog posts. `[[anim: <group>]]` in a post body mounts a
// VariantFigure showing one selected variant. Alternatives remain in the source archive.
// Each variant is a standalone canvas page in static/anim/<group>/<name>.html,
// 640x400, granular ink on paper, no surrounding chrome of its own.

export type Variant = { name: string; label: string; caption: string };

export const ANIMS: Record<string, Variant[]> = {
	settling: [
		{
			name: 'essay_tree',
			label: 'Mobile',
			caption: 'One sentence changes the shape of the essay.'
		},
		{
			name: 'manuscript',
			label: 'Manuscript',
			caption: 'Change a block and the other blocks start to feel tension.'
		},
		{
			name: 'essay_page',
			label: 'Page',
			caption:
				'One sentence turns out to be the point. The intro loses its weight, a paragraph goes quiet, the thesis moves, and paths open below that were not there before.'
		},
		{
			name: 'landscape',
			label: 'Landscape',
			caption:
				'New evidence reshapes the landscape everywhere at once. The ball rolls to a basin that did not exist a moment ago.'
		},
		{
			name: 'inkwash',
			label: 'Ink wash',
			caption: 'Move one drop and the boundaries between every neighbouring idea redraw themselves.'
		},
		{
			name: 'cloth',
			label: 'Cloth',
			caption:
				'Pull one thread and the weave reorganizes around it. The fabric keeps the new shape.'
		}
	],
	relight: [
		{
			name: 'sheet',
			label: 'Sheet',
			caption: 'New evidence ripples through an existing structure.'
		},
		{
			name: 'logbook',
			label: 'Logbook',
			caption: 'Not one entry moved. One call, and the same months of failures read as a signal.'
		},
		{
			name: 'inkfield',
			label: 'Ink field',
			caption: 'A new fact lands and the whole sheet folds around it. Nothing goes back.'
		},
		{
			name: 'horn',
			label: 'Horn',
			caption:
				'The hiss was in the ear the whole time. The call changed what the same dots were evidence of.'
		},
		{
			name: 'constellation',
			label: 'Constellation',
			caption: 'No star moved. One new point of light and the figure is drawn differently.'
		},
		{
			name: 'gestalt',
			label: 'Gestalt',
			caption: 'Not one dot moved. The call changed which of them belonged together.'
		}
	],
	catsat: [
		{
			name: 'columns',
			label: 'Columns',
			caption:
				'Each token builds its own representation through the layers. During causal generation, later tokens do not revise the earlier cached states.'
		},
		{
			name: 'confluence',
			label: 'Stream',
			caption: 'Each token draws on what came before. Earlier representations stay fixed.'
		},
		{
			name: 'river',
			label: 'River',
			caption: 'Everything upstream feeds the river. Nothing flows back up.'
		},
		{
			name: 'letters',
			label: 'Letters',
			caption: 'Ink runs forward into the next word. The words already dry do not take it back.'
		},
		{
			name: 'strata',
			label: 'Strata',
			caption: 'Each layer is made from what lies beneath it. Once buried, a layer never changes.'
		},
		{
			name: 'crystal',
			label: 'Crystal',
			caption:
				'Each new facet takes its angle from the ones before it. The old facets are already set.'
		}
	],
	cubic: [
		{
			name: 'springs',
			label: 'Coupled blocks',
			caption: 'Each new block adds another round of work.'
		},
		{
			name: 'ledger',
			label: 'Ledger',
			caption: 'Rechecking every pair after every new token adds up.'
		},
		{
			name: 'loom',
			label: 'Loom',
			caption:
				'Every new token strings a spring to every token before it. The web stays delicate. The bill for rechecking it grows like a cube.'
		},
		{
			name: 'pairs',
			label: 'Pairs',
			caption:
				'Every new token reopens every relationship. One squared check after another adds up to n cubed.'
		},
		{
			name: 'stack',
			label: 'Stack',
			caption: 'Adding one more token means checking every pair again. The pile grows like a cube.'
		}
	],
	notes: [
		{
			name: 'triangles',
			label: 'Contexts',
			caption: 'Each agent rebuilds from the note. The shared structure changes in place.'
		},
		{
			name: 'telegraph',
			label: 'Telegraph',
			caption:
				'The same discovery, twice. A note must be rebuilt at every stop and fades on the way. A connected state changes all at once and keeps the shape.'
		},
		{
			name: 'web',
			label: 'Web',
			caption:
				'The same discovery, twice. Notes are relayed and rebuilt, hop by hop. A web feels the pull everywhere at once.'
		},
		{
			name: 'reeds',
			label: 'Reeds',
			caption:
				'The same discovery, twice. Left, it is carried one pair of hands at a time. Right, the wind reaches every reed, and the field keeps the lean.'
		},
		{
			name: 'copies',
			label: 'Copies',
			caption:
				'The same discovery, twice. A note is a copy of a copy of a copy. The living map just changes.'
		}
	],
	hawf: [
		{
			name: 'field',
			label: 'Wave field',
			caption: 'New evidence reshapes the field. The state moves in response.'
		}
	],
	harness: [
		{
			name: 'workspace',
			label: 'Workspace',
			caption: 'Separate attempts return to a shared draft.'
		}
	]
};
