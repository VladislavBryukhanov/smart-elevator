import {Label, Root, Field} from '@radix-ui/react-form';
import {styled} from 'styled-components';

export const SettingsFormWrapper = styled(Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 14px;
  margin: 40px 20px 20px;
  align-items: center;
`;

export const FormField = styled(Field)`
  width: 60vw;
`;

export const FormFieldLabel = styled(Label)`
  display: flex;
  font-size: 14px;
`;

export const FormFieldInput = styled.input`
  margin-top: 4px;
  padding: 4px;
  width: 100%
`;

export const SubmitButton = styled.button`
  padding: 6px;
  border-radius: 6px;
  background: white;
  cursor: pointer;
`;

