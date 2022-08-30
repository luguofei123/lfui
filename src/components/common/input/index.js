import LfInput from './src/input';

/* istanbul ignore next */
LfInput.install = function (Vue) {
    Vue.component(LfInput.name, LfInput);
};

export default LfInput;