import { parse } from 'yamljs';

const parser = {
  parseYaml: (yamlString) => {
    try {
      const data = parse(yamlString);
      return data;
    } catch (error) {
      throw new Error(`Error parsing YAML: ${error.message}`);
    }
  },
};

export default parser;