import json
import random
import datetime
import re


def read_json_file(file_path: str) -> list:
    """
    Read a JSON file and return the list of elements in 'snapshot.element'.
    """
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data.get('snapshot', {}).get('element', [])


def read_custom_schema(file_path: str) -> dict:
    """
    Read and parse a custom FHIR schema file.
    """
    with open(file_path, 'r') as file:
        schema = json.load(file)
    return schema.get('definitions', {})


def fake_birthdate() -> str:
    """
    Generate a fake birthdate in YYYY-MM-DD format.
    """
    start_date = datetime.date(1900, 1, 1)
    end_date = datetime.date(2022, 12, 31)
    days_between_dates = (end_date - start_date).days
    random_date = start_date + datetime.timedelta(days=random.randrange(days_between_dates))
    return random_date.isoformat()


def generate_data_according_to_custom_type(type_info: dict) -> str:
    """
    Generate data according to the custom type definition.
    """
    if type_info.get('type') == 'string' and 'pattern' in type_info:
        pattern = type_info['pattern']
        # Generate a string that matches the pattern
        # This is a simplified example, adjust it according to the actual pattern requirements
        return ''.join(random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') for i in range(10))
    return ""


def generate_nested_fake_fhir_data_with_arrays(snapshot_elements: list, custom_schema: dict) -> dict:
    """
    Generate nested fake data for a given list of FHIR snapshot elements,
    handling arrays indicated by '[x]' in the path.
    """

    def nested_dict_assign(nested_dict, keys, value):
        for i, key in enumerate(keys[:-1]):
            if '[x]' in key:
                key = key.replace('[x]', '')
                if key not in nested_dict or not isinstance(nested_dict[key], list):
                    nested_dict[key] = []  # Ensure it's a list
                if not nested_dict[key]:
                    nested_dict[key].append({})
                nested_dict = nested_dict[key][-1]
            else:
                if key not in nested_dict or isinstance(nested_dict.get(key), str):
                    nested_dict[key] = {}  # Ensure it's a dict
                nested_dict = nested_dict[key]

    # This part should be outside the for loop but inside the function
    last_key = keys[-1].replace('[x]', '')
    if '[x]' in keys[-1]:
        if last_key not in nested_dict or not isinstance(nested_dict[last_key], list):
            nested_dict[last_key] = []  # Ensure it's a list
        nested_dict[last_key].append(value)
    else:
        nested_dict[last_key] = value


    fhir_data = {}

    for element in snapshot_elements:
        path_components = element["path"].split(".")
        element_type = element.get("type", [{}])[0].get("code")

        if element_type == "date":
            nested_dict_assign(fhir_data, path_components, fake_birthdate())
        elif element_type == "boolean":
            nested_dict_assign(fhir_data, path_components, random.choice([True, False]))
        elif element_type == "string":
            nested_dict_assign(fhir_data, path_components, "String")
        elif element_type in custom_schema:
            type_info = custom_schema[element_type]
            value = generate_data_according_to_custom_type(type_info)
            nested_dict_assign(fhir_data, path_components, value)

    return fhir_data


# File paths
json_file_path = '/kaggle/input/ttttttt/StructureDefinition-patient-iclaim.json'  # Replace with the actual path
schema_file_path = '/kaggle/input/fhir-schema401/fhir_schema401.json'  # Replace with the actual path

# Generate nested fake data from the JSON file
snapshot_elements = read_json_file(json_file_path)
custom_schema = read_custom_schema(schema_file_path)
nested_fake_fhir_data_from_file = generate_nested_fake_fhir_data_with_arrays(snapshot_elements, custom_schema)
print(nested_fake_fhir_data_from_file['Patient'])
