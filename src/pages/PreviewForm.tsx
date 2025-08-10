// src/pages/PreviewForm.tsx
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Paper, Typography, Button } from "@mui/material"; // Removed TextField import
import { useAppSelector } from "../hooks/redux";
import { FormField } from "../types/form.types";
import { RootState } from "../reduxStore";
import { evaluateFormula } from "../utils/formula-evaluator";
import FieldPreviewRenderer from "../components/FormPreview/FieldPreviewRenderer"; // New import

const createValidationSchema = (fields: FormField[]) => {
  const schemaFields: Record<string, yup.StringSchema> = {};
  fields.forEach((field) => {
    let fieldSchema = yup.string();
    if (field.id === "confirmPassword") {
      fieldSchema = fieldSchema.oneOf(
        [yup.ref("password")],
        "Passwords must match"
      );
    }
    field.validation.forEach((rule) => {
      switch (rule.type) {
        case "required":
          fieldSchema = fieldSchema.required(rule.message);
          break;
        case "minLength":
          fieldSchema = fieldSchema.min(rule.value as number, rule.message);
          break;
        case "email":
          fieldSchema = fieldSchema.email(rule.message);
          break;
        case "password":
          const passwordRegex = /^(?=.*\d).{8,}$/;
          fieldSchema = fieldSchema.matches(passwordRegex, rule.message);
          break;
      }
    });
    schemaFields[field.id] = fieldSchema;
  });
  return yup.object().shape(schemaFields);
};

const PreviewForm: React.FC = () => {
  const currentFormFields: FormField[] = useAppSelector(
    (state: RootState) => state.forms.currentForm.fields
  );
  const validationSchema = createValidationSchema(currentFormFields);
  type FormValues = {
    [key: string]: any;
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const watchedFields = useWatch({ control });

  useEffect(() => {
    currentFormFields.forEach((field) => {
      if (field.isDerived) {
        const newValue = evaluateFormula(
          field.derivedFormula || "",
          watchedFields
        );
        setValue(field.id, newValue);
      }
    });
  }, [watchedFields, currentFormFields, setValue]);

  const onSubmit = (data: FormValues): void => {
    console.log(data);
    alert("Form submitted! Check the console for data.");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Preview Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentFormFields.length > 0 ? (
            currentFormFields.map((field: FormField) => (
              // Replace the TextField with the new dynamic renderer
              <FieldPreviewRenderer
                key={field.id}
                field={field}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No fields to preview. Please create a form first.
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PreviewForm;
