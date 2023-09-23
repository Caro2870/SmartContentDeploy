<template>
  <b-row>
    <template v-for="(filter, index) in filters">
      <b-col
        v-if="filter.visible === undefined ? true : filter.visible"
        :key="index"
        :cols="filter.cols ? filter.cols : ''"
        :class="filter.margin === true ? 'mt-1' : ''"
      >
        <label v-if="filter.showLabel">{{ filter.label }}</label>
        <b-form-input
          v-if="filter.type === 'input'"
          v-model="filter.model"
          :class="filter.class"
          :type="filter.inputType"
          :placeholder="filter.placeholder"
        />
        <b-form-input
          v-if="filter.type === 'input-masked'"
          v-model="filter.model"
          :class="filter.class"
          :type="filter.inputType"
          v-mask="filter.vMask ? filter.vMask : '################'"
          :placeholder="filter.placeholder"
        />
        <b-form-input
          v-if="filter.type === 'input-percent'"
          v-model="filter.model"
          :class="filter.class"
          :type="filter.inputType"
          v-mask="filter.vMask ? filter.vMask : '##.##'"
          :placeholder="filter.placeholder"
        />
        <money
          v-if="filter.type === 'input-money'"
          v-model="filter.model"
          class="form-control"
          :class="filter.class"
          v-bind="{
            maxlength:
              filter.moneyLength == undefined ? 16 : filter.moneyLength + 2,
            decimal: '.',
            thousands: ',',
            prefix: filter.moneyPrefix == undefined ? '$ ' : filter.moneyPrefix,
            precision: 2,
            masked: false,
          }"
        />
        <vue-autosuggest
            v-if="filter.type === 'suggest'"
            :suggestions="filter.options"
            :get-suggestion-value="getSuggestionValue"
            :input-props="{id:'autosuggest__input',class:'form-control', placeholder: filter.showText}"
            v-on="{ input: (param1) => !filter.typeQuery ? onInputChange(param1, index) : onInputChangeDB(param1,index),
                  selected: (param1) => !filter.typeQuery ? selectHandler(param1, index) : selectHandlerDB(param1,index),
          }"
        >
          <template slot-scope="{suggestion}">
            <span class="my-suggestion-item">{{ suggestion.item[filter.selectText] }}</span>
          </template>
        </vue-autosuggest>
        <b-button
          v-if="filter.type === 'button'"
          block
          :class="filter.class"
          :disabled="filter.model ? filter.model : false"
          :variant="filter.variant"
          :pressed.sync="filter.model"
          ><feather-icon
            v-if="filter.showIcon"
            :icon="filter.icon"
            class="mr-50"
          /><span v-if="filter.showButtonLabel">{{
            filter.label
          }}</span></b-button
        >
        <b-form-datepicker
          v-else-if="filter.type === 'datepicker'"
          v-model="filter.model"
          :class="filter.class"
          :locale="filter.locale"
          :date-format-options="filter.dateFormatOptions"
          :placeholder="filter.placeholder"
        />
        <b-form-timepicker
          v-else-if="filter.type === 'timer'"
          v-model="filter.model"
          :class="filter.class"
          :minutes-step="filter.minutes"
          :placeholder="filter.placeholder"
        />
        <v-select
          v-else-if="filter.type === 'select'"
          v-model="filter.model"
          :class="filter.class"
          :options="filter.options"
          :multiple="filter.multiple === undefined ? false : filter.multiple"
          :label="filter.selectText"
          :reduce="(value) => value[filter.reduce]"
          :placeholder="filter.placeholder"
          :disabled="filter.disabled ? filter.disabled : false"
          @input="emitEvent(filter.emitEvent, filter.typeEvent)"
        />
        <b-form-checkbox
          v-else-if="filter.type === 'switch'"
          v-model="filter.model"
          checked="true"
          class="custom-control-primary"
          name="check-button"
          switch
        />
        <vue-slider
          v-else-if="filter.type === 'slider'"
          :data="filter.options"
          v-model="filter.model"
        />
        <kendo-timepicker
            v-else-if="filter.type === 'k-timer'"
            v-model="filter.model"
            :format="'HH:mm'"
            :minutes-step="filter.minutes"
            class="w-100 rounded bg-transparent k-picker-custom"
            style="height: 2.73rem"

            :placeholder="filter.placeholder"

        />



        <slot
          v-if="filter.type === 'custom-select'"
          name="custom-select"
        ></slot>
      </b-col>
    </template>
  </b-row>
</template>

<script>
import vSelect from "vue-select";
import { VueAutosuggest } from "vue-autosuggest";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  components: {
    vSelect,
    VueAutosuggest,
    VueSlider,
  },
  props: {
    filters: Array,
  },
  methods: {
    emitEvent(emit, type) {
      if (emit) {
        this.$emit("onSelectChange", type);
      }
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.value;
    },
    selectHandler(value, index) {
      this.filters[index].savedValue = value.item.id;
      this.filters[index].showText = value.item.value;
    },
    selectHandlerDB(value, index) {
      this.filters[index].savedValue = value.item.id;
      this.filters[index].showText = value.item.state;
    },
    onInputChange(text, index) {
      this.filters[index].model = text;
    },
    async onInputChangeDB(text, index) {
      try{
      let apiUrl = this.filters[index].apiUrl;
      let params={
        text: text
      }
      // const {data} = await smartApi.post(apiUrl, params);
      this.filters[index].options = [{ data: [...data] }];
      }
      catch(error){
        throw error
      }
    },
  },
};
</script>
<style >
.p-1px {
  margin-left: 5px;
  margin-right: 5px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
