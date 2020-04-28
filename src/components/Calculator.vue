<template>
  <div class="calculator">
    <form
      class="form"
      v-show="!state.submitted"
      v-on:submit.prevent="submit"
    >
      <input v-model="form.name" type="text" placeholder="Name" required>
      <input v-model="form.gender" type="text" placeholder="Gender (M or F)" maxlength="1" required>
      <input v-model="form.age" type="number" placeholder="Age (Months)" min="1" step="1" required>
      <input v-model="form.weight" type="number" placeholder="Weight (kg)" min="1" step="1" required>
      <input v-model="form.height" type="number" placeholder="Height (cm)" min="1" step="1" required>
      <Button title="Submit" />
    </form>
    <div
      v-show="state.submitted"
      class="form"
    >
      <table v-if="dataReady">
        <tr v-if="weightForAgeDescription.text">
          <td>Weight For Age: </td>
          <td> {{ weightForAgeDescription.text }} ({{ results.weightForAge }}%)</td>
        </tr>
        <tr v-if="heightForAgeDescription.text">
          <td>Height For Age: </td>
          <td> {{ heightForAgeDescription.text }} ({{ results.heightForAge }}%)</td>
        </tr>
        <tr v-if="weightForHeightDescription.text">
          <td>Weight For Height: </td>
          <td> {{ weightForHeightDescription.text }}  ({{ results.weightForHeight }}%)</td>
        </tr>
        <tr v-if="bmiDescription.text">
          <td>BMI: </td>
          <td> {{ bmiDescription.text }} ({{ results.bmi }}%) </td>
        </tr>
      </table>
      <div v-if="!dataReady">
        Calculating...
      </div>
    </div>
  </div>
</template>
<script>
  /* Components */
  import Button from './Button.vue';
  import data  from '../util/data.js';
  import ztable from 'ztable';

  const zScorePercentile = function(x, l, m, s) { // w, m, l
    const zScore = (((x / m) ** l) - 1) / (l * s);
    const percentile = ztable(zScore);
    return percentile * 100;
  };

  export default {
    name: "GrowthAppCalculator",
    components: {
      Button,
    },
    computed: {
      weightForAgeDescription() {
        const weightForAge = this.results.weightForAge;
        if (weightForAge == null) {
          return { text: null, scale: null };
        }
        let text = "Third Degree (severe) malnutrition";
        let scale = 5;
        if (weightForAge >= 90) {
          text = "Normal nutritional status";
          scale = 2;
        } else if (weightForAge >= 75) {
          text = "First Degree (mild) malnutrition";
          scale = 3;
        } else if (weightForAge >= 60) {
          text = "Second Degree (moderate) malnutrition";
          scale = 4;
        }
        return { text, scale };
      },
      heightForAgeDescription() {
        const heightForAge = this.results.heightForAge;
        if (heightForAge == null) {
          return { text: null, scale: null };
        }
        let text = "Severely Impaired Height";
        let scale = 5;
        if (heightForAge >= 95) {
          text = "Normal Height";
          scale = 2;
        } else if (heightForAge >= 87.5) {
          text = "Mildly Impaired Height";
          scale = 3;
        } else if (heightForAge >= 80) {
          text = "Moderately Impaired Height";
          scale = 4;
        }
        return { text, scale };
      },
      weightForHeightDescription() {
        const weightForHeight = this.results.weightForHeight;
        if (weightForHeight == null) {
          return { text: null, scale: null };
        }
        let text = "Severely Impaired Weight to Height";
        let scale = 5;
        if (weightForHeight == 0) {
          text = "N/A - Data unavailable";
          scale = 1;
        }
        if (weightForHeight > 90) {
          text = "Normal Weight to Height";
          scale = 2;
        } else if (weightForHeight >= 80) {
          text = "Mildly Impaired Weight to Height";
          scale = 3;
        } else if (weightForHeight >= 70) {
          text = "Moderately Impaired Weight to Height";
          scale = 4;
        }
        return { text, scale };
      },
      bmiDescription() {
        const bmi = this.results.bmi;
        if (bmi == null) {
          return { text: null, scale: null };
        }

        let text = "Underweight";
        let scale = 5;

        if (bmi > 95) {
          text = "Obese";
          scale = 5;
        } else if (bmi >= 85) {
          text = "Overweight";
          scale = 4;
        } else if (bmi >= 5) {
          text = "Normal Weight";
          scale = 3;
        }
        return { text, scale };
      },
      dataReady() {
        return this.weightForAgeDescription;
      },
    },
    data() {
      return {
        form: {
          name: '',
          gender: '',
          age: null,
          weight: null,
          height: null,
        },
        results: {
          weightForAge: null,
          heightForAge: null,
          weightForHeight: null,
          bmi: null,
        },
        state: {
          submitted: false,
        },
      }
    },
    methods: {
      submit() {
        /* Weight For Age */
        let lmsWeightForAge = [null, null, null]; // [L, M, S]
        if (this.form.gender == 'M') {
          lmsWeightForAge = data.weightForAgeMale[this.form.age];
        } else if (this.form.gender == 'F') {
          lmsWeightForAge = data.weightForAgeMale[this.form.age];
        }
        this.results.weightForAge = zScorePercentile(this.form.weight, lmsWeightForAge[0], lmsWeightForAge[1], lmsWeightForAge[2]);

        /* Height For Age */
        let lmsHeightForAge = [null, null, null]; // [L, M, S]
        if (this.form.gender == 'M') {
          lmsHeightForAge = data.heightForAgeMale[this.form.age];
        } else if (this.form.gender == 'F') {
          lmsHeightForAge = data.heightForAgeMale[this.form.age];
        }
        this.results.heightForAge = zScorePercentile(this.form.height, lmsHeightForAge[0], lmsHeightForAge[1], lmsHeightForAge[2]);

        /* Weight For Height */
        this.results.weightForHeight = 0;

        /* BMI */
        let lmsBMI = [null, null, null]; // [L, M, S]
        if (this.form.gender == 'M') {
          lmsBMI = data.bmiMale[this.form.age];
        } else if (this.form.gender == 'F') {
          lmsBMI = data.bmiFemale[this.form.age];
        }
        const bmi = (this.form.height / (this.form.weight ** 2)) * 10000;
        this.results.bmi = zScorePercentile(bmi, lmsBMI[0], lmsBMI[1], lmsBMI[2]);

        this.state.submitted = true;
      },
    },
  }
</script>
<style lang="scss" scoped>
  .form {
    margin: auto;
    display: flex;
    flex-direction: column;
    input {
      &:not(:first-child) {
        margin-top: 1.5em;
      }
      border: 1px solid #dddddd;
      border-radius: 0.5em;
      padding: 0.5em;
    }
    .btn {
      margin-top: 1.5em;
    }
  }
</style>
