import {useForm} from 'react-hook-form';
import {Control, Submit} from '@radix-ui/react-form';
import {useSelector} from 'react-redux';
import {selectSettings} from '@store/settings/selectors';
import {setSettings} from '@store/settings/slice';
import {useStoreDispatch} from '@store/index';
import {FormField, FormFieldInput, FormFieldLabel, SettingsFormWrapper, SubmitButton} from './styles';

export const Settings = () => {
  const dispatch = useStoreDispatch();
  const settings = useSelector(selectSettings);

  const {register, handleSubmit} = useForm({defaultValues: settings});

  return (
    <SettingsFormWrapper onSubmit={handleSubmit(settings => dispatch(setSettings(settings)))}>
      <FormField {...register('elevatorsAmount')} >
        <FormFieldLabel>Elevators Amount</FormFieldLabel>
        <Control asChild>
          <FormFieldInput type="number" />
        </Control>
      </FormField>

      <FormField {...register('floorsAmount')} >
        <FormFieldLabel>Building Floors Amount</FormFieldLabel>
        <Control asChild>
          <FormFieldInput type="number" />
        </Control>
      </FormField>

      <FormField {...register('movingDelay')} >
        <FormFieldLabel>Delay between elevators moving</FormFieldLabel>
        <Control asChild>
          <FormFieldInput step={100} type="number" />
        </Control>
      </FormField>

      <Submit asChild>
        <SubmitButton>
          Apply settings
        </SubmitButton>
      </Submit>
    </SettingsFormWrapper>
  );
}
