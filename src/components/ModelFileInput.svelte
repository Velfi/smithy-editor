<script lang="ts">
  import { isRawModel, SmithyModel } from '$lib/smithyModel';
  import { entries } from 'lodash';
  import * as stores from '../stores';
  import * as shapes from '$lib/shapes';

  let files: FileList;

  $: if (files) {
    stores.isLoadingModel.set(true);
    files[0]
      .text()
      .then(JSON.parse)
      .then((modelJSON) => {
        if (!isRawModel(modelJSON)) {
          throw new Error(`Model is not a valid Smithy model`);
        }

        let serviceShapeCount = 0;
        let name;
        let shape;

        for (const [k, v] of entries(modelJSON.shapes)) {
          if (shapes.isService(v)) {
            name = k;
            shape = v;
            serviceShapeCount += 1;
          }
        }

        if (name === undefined || shape === undefined) {
          throw new Error(`Model does not define a service shape`);
        } else if (serviceShapeCount > 1) {
          throw new Error(`Expected 1 service shape but found ${serviceShapeCount}`);
        }

        return new SmithyModel(modelJSON.smithy, name, shape, modelJSON);
      })
      .then((model) => {
        stores.smithyModel.set(model);
      });
  }
</script>

<label>
  Load your Smithy model to begin:
  <input
    type="file"
    id="smithyModelFile"
    name="smithyModelFile"
    accept=".json,.smithy"
    required
    bind:files
  />
</label>
<p class="apologetic">Very large models may take a few seconds to load.</p>

<style lang="scss">
  .apologetic {
    font-size: 0.8rem;
    color: #777;
    font-style: italic;
  }
</style>
