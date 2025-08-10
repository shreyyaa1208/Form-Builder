import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
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
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { reorderFields } from "../../store/slices/formsSlice";
import { FormField } from "../../types/form.types";

import FieldRenderer from "./FieldRenderer";
import { SortableItem } from "./SortableItem";
import FieldTypeSelector from "./FieldTypeSelector";

const FormBuilder = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.forms.currentForm.fields);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  // const sensors = useSensors(useSensor(PointerSensor));
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

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
    <Stack spacing={3} margin={0} padding={" 20px 0 "}>
      <Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Add New Field
          </Typography>
          <FieldTypeSelector />
        </Box>
        <Typography variant="h6" gutterBottom>
          Form Fields
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={({ active }) => {
            console.log("Drag started for field:", active.data.current);
            // setSelectedField(active.data.current);
          }}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            <Stack gap={2}>
              {fields.map((field) => (
                <SortableItem key={field.id} id={field.id}>
                  <FieldRenderer
                    field={field}
                    onClick={() => handleSelectField(field)}
                    isSelected={field.id === selectedField?.id}
                  />
                </SortableItem>
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      </Box>
      <Box>
        {/* {selectedField ? (
          <FieldConfigPanel field={selectedField} />
        ) : ( */}
        {fields.length === 0 && (
          <Box sx={{ p: 3, border: "1px solid #ccc", borderRadius: 1 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Selected fields will appear here.
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default FormBuilder;
