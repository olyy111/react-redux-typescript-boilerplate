/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Page',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }
      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: true,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tupel for this container?',
  }, {
    type: 'confirm',
    name: 'wantSagas',
    default: true,
    message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
  }],
  actions: (data) => {
    let actions = [{
      type: 'add',
      path: '../../src/app/containers/{{properCase name}}/index.tsx',
      templateFile: './container/index.tsx.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: '../../src/app/index.tsx',
      pattern: /(\/\* PREPEND IMPORT HERE \*\/)/gi,
      template: 'import {{properCase name}} from \'app/containers/{{properCase name}}/index.tsx\';\r\n$1'
    }, {
      type: 'add',
      path: '../../src/app/models/{{properCase name}}Model.ts',
      templateFile: './container/model.ts.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: '../../src/app/models/index.ts',
      pattern: /(\/\* PREPEND IMPORT HERE \*\/)/gi,
      template: 'export { {{properCase name}}Model } from \'./{{properCase name}}Model\';\r\n$1'
    }];

    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../src/app/containers/{{properCase name}}/styles.css',
        templateFile: './container/styles.css.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/app/actions/{{ camelCase name }}.ts',
        templateFile: './container/actions.ts.hbs',
        abortOnFail: true,
      });
      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/app/reducers/{{ camelCase name }}.ts',
        templateFile: './container/reducer.ts.hbs',
        abortOnFail: true,
      });
      // modify files
      actions = actions.concat([
        {
          type: 'modify',
          path: '../../src/app/reducers/index.ts',
          pattern: /(\/\* PREPEND IMPORT HERE \*\/)/gi,
          template: 'import { {{ camelCase name }}Reducer } from \'./{{ camelCase name }}\';\r\n$1'
        },
        {
          type: 'modify',
          path: '../../src/app/reducers/index.ts',
          pattern: /(\/\* PREPEND ATTR HERE \*\/)/gi,
          template: '{{ camelCase name }}: {{ camelCase name }}Reducer as any,\r\n  $1'
        },
        {
          type: 'modify',
          path: '../../src/app/actions/index.ts',
          pattern: /(\/\* PREPEND IMPORT HERE \*\/)/gi,
          template: 'export { {{ camelCase name }}Actions } from \'./{{ camelCase name }}\';\r\n$1'
        },

        {
          type: 'modify',
          path: '../../src/app/reducers/RootState.ts',
          pattern: /(\/\* PREPEND IMPORT HERE \*\/)/gi,
          template: '{{properCase name}}Model,\r\n  $1'
        },
        {
          type: 'modify',
          path: '../../src/app/reducers/RootState.ts',
          pattern: /(\/\* PREPEND ATTR1 HERE \*\/)/gi,
          template: '{{ camelCase name }}: RootState.{{properCase name}}State;\r\n  $1'
        },
        {
          type: 'modify',
          path: '../../src/app/reducers/RootState.ts',
          pattern: /(\/\* PREPEND ATTR2 HERE \*\/)/gi,
          template: 'export type {{properCase name}}State = {{properCase name}}Model;\r\n  $1'
        }
      ]);
    }

    // Sagas
    if (data.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../src/app/sagas/{{ camelCase name }}Saga.ts',
        templateFile: './container/sagas.ts.hbs',
        abortOnFail: true,
      });
    }
    return actions;
  },
};
