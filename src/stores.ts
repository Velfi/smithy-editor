import type { Shape } from '$lib/shapes';
import type { SmithyModel } from '$lib/smithyModel';
import { writable } from 'svelte/store';

export const smithyModel = writable<SmithyModel | null>(null);
export const isModelLoaded = writable<boolean>(false);
export const searchFilter = writable<string>('');
export const isLoadingModel = writable<boolean>(false);
export const filteredShapes = writable<[string, Shape][] | undefined>(undefined);

smithyModel.subscribe((model) => {
  if (model === null) {
    isModelLoaded.set(false);
  } else {
    // classifyTraitsInModel(model);
    isModelLoaded.set(true);
  }
  isLoadingModel.set(false);
});

/// This is a helper function to print out all of the traits in a model and their types.
/// Then, the traits can be added to the known traits list for classification purposes.
/// A trait doesn't have to be in the known traits list, but traits that are will benefit
/// from better rendering in the UI.
export function classifyTraitsInModel(model: SmithyModel) {
  const traitMap = new Map<string, Set<string>>();

  for (const [, shape] of model.shapes()) {
    if ('traits' in shape && shape.traits !== undefined) {
      const traits = Object.entries(shape.traits);
      for (const [traitName, traitValue] of traits) {
        const typeOfTrait = typeof traitValue;
        let traitSet = traitMap.get(traitName);

        if (traitSet === undefined) {
          traitSet = new Set<string>();
          traitMap.set(traitName, traitSet);
        }

        traitSet.add(typeOfTrait);
      }
    }
  }

  let totalOutput = '';

  for (const [key, set] of traitMap) {
    let output = `"${key}": `;

    for (const value of set) {
      output += value + ' | ';
    }

    if (output.endsWith(' | ')) {
      output = output.slice(0, -3);
    }

    output += ',\n';
    totalOutput += output;
  }

  console.log(totalOutput);
}
