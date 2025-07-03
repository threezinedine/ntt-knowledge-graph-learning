/**
 * Generate the new heights so that the sum of the heights will be 1 based on the
 *      modified index.
 *
 * @param groupHeights must have at least 2 elements, the sum of the heights might be less or greater than 1
 * @param minHeight the minimum height of each group, after the modification, if the height of the group cannot
 *      less than this value (except the value is 0).
 * @param modifiedIndex the index of the group that is modified, this value will not be changed in the result
 *
 * @return The new group heights which sum is 1.
 *
 * @example ([0.2, 0.0, 0.7], 0.1, 1) -> [0.2, 0.0, 0.8] // remove the 0.1 then the last group will be increased by 0.1
 * @example ([0.2, 0.0, 0.7], 0.1, 2) -> [1.0, 0.0, 0.0] // remove the 0.7 then the first group will be increased by 0.7
 * @example ([0.2, 0.1, 0.8], 0.1, 1) -> [0.2, 0.1, 0.7] // remove the 0.1 then the last group will be increased by 0.1
 */
export function realignSidebarGroupHeights(
	groupHeights: number[],
	minHeight: number,
	totalHeight: number,
	modifiedIndex: number,
): number[] {
	const groupCount = groupHeights.length;

	if (modifiedIndex >= groupCount) {
		throw new Error('modifiedIndex is out of range');
	}

	const isAllClosed = groupHeights.every((height) => height === 0);
	if (isAllClosed) {
		return groupHeights;
	}

	const newGroupHeights = [...groupHeights];
	let different = totalHeight - newGroupHeights.reduce((sum, height) => sum + height, 0);

	for (let i = 0; i < groupCount; i++) {
		if (i === modifiedIndex || groupHeights[i] === 0) {
			continue;
		}

		if (newGroupHeights[i] + different > minHeight) {
			newGroupHeights[i] += different;
			different = 0;
			break;
		} else {
			newGroupHeights[i] = minHeight;
			different = different + (minHeight - newGroupHeights[i]);
		}
	}

	different = totalHeight - newGroupHeights.reduce((sum, height) => sum + height, 0);

	if (different !== 0) {
		for (let i = groupCount - 1; i >= 0; i--) {
			if (i === modifiedIndex || groupHeights[i] === 0) {
				continue;
			}

			if (newGroupHeights[i] - different < minHeight) {
				newGroupHeights[i] -= different;
				different = 0;
				break;
			} else {
				newGroupHeights[i] = minHeight;
				different = different + (minHeight - newGroupHeights[i]);
			}
		}
	}

	if (different !== 0) {
		newGroupHeights[modifiedIndex] += different;
	}

	return newGroupHeights;
}

export function calculateContentHeight(styles: Record<string, string>, callback: (contentHeight: number) => void) {
	const contents = document.querySelectorAll(`.${styles['sidegroup-header']}`);
	if (!contents) return;

	const culHeaderHeight = Array.from(contents).reduce((acc, curr) => acc + curr.clientHeight, 0);

	const sidebar = document.querySelector(`.${styles['sidebar']}`);
	if (!sidebar) return;

	const sidebarHeight = sidebar.clientHeight;

	callback(sidebarHeight - culHeaderHeight);
}
