import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { reorderFields } from "../../store/slices/formsSlice";
import { FormField } from "../../types/form.types";

import FieldRenderer from "./FieldRenderer";
import { SortableItem } from "./SortableItem";
import FieldConfigPanel from "./FieldConfigPanel";
import FieldTypeSelector from "./FieldTypeSelector";

const FormBuilder = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.forms.currentForm.fields);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newFields = arrayMove(fields, oldIndex, newIndex);
        dispatch(reorderFields(newFields));
      }
    }
    setSelectedField(null);
  };

  console.log("Selected Field:", selectedField);
  console.log("Field:", fields);

  const handleSelectField = (field: FormField) => {
    console.log("Selected Field ID:", field);
    setSelectedField(field);
  };

  return (
    <Grid container spacing={3}>
      {/* Left Column: Form Builder and Field Selector */}
      <Grid>
        <Typography variant="h6" gutterBottom>
          Form Fields
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          // onDragStart={({ active }) => setSelectedField(active.data.current)}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field) => (
              <SortableItem key={field.id} id={field.id}>
                <FieldRenderer
                  field={field}
                  onClick={() => handleSelectField(field)}
                  isSelected={field.id === selectedField?.id}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Field
          </Typography>
          <FieldTypeSelector />
        </Box>
      </Grid>

      {/* Right Column: Field Configuration Panel */}
      <Grid>
        {selectedField ? (
          <FieldConfigPanel field={selectedField} />
        ) : (
          <Box sx={{ p: 3, border: "1px solid #ccc", borderRadius: 1 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Select a field on the left to configure its settings.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default FormBuilder;
