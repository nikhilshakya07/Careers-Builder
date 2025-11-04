'use client';

import { useState, useEffect } from 'react';
import type { Section } from '@/app/lib/types';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import Select, { type SelectOption } from '@/app/components/ui/Select';

interface SectionBuilderProps {
  sections: Section[];
  onUpdate: (sections: Section[]) => Promise<void>;
  loading?: boolean;
}

const SECTION_TYPES: Array<{ value: Section['type']; label: string }> = [
  { value: 'about', label: 'About' },
  { value: 'life', label: 'Life at Company' },
  { value: 'benefits', label: 'Benefits' },
  { value: 'values', label: 'Values' },
  { value: 'culture', label: 'Culture' },
  { value: 'team', label: 'Team' },
  { value: 'custom', label: 'Custom' },
];

export default function SectionBuilder({ sections, onUpdate, loading = false }: SectionBuilderProps) {
  const [localSections, setLocalSections] = useState<Section[]>(sections);
  const [saving, setSaving] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    setLocalSections(sections);
  }, [sections]);

  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'New Section',
      content: '',
      order: localSections.length,
      is_visible: true,
    };
    setLocalSections([...localSections, newSection]);
  };

  const handleRemoveSection = (id: string) => {
    setLocalSections(localSections.filter((s) => s.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...localSections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    newSections[index - 1].order = index - 1;
    newSections[index].order = index;
    setLocalSections(newSections);
  };

  const handleMoveDown = (index: number) => {
    if (index === localSections.length - 1) return;
    const newSections = [...localSections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    newSections[index].order = index;
    newSections[index + 1].order = index + 1;
    setLocalSections(newSections);
  };

  const handleUpdateSection = (id: string, field: keyof Section, value: unknown) => {
    setLocalSections(
      localSections.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update order for all sections
      const orderedSections = localSections.map((s, index) => ({
        ...s,
        order: index,
      }));
      await onUpdate(orderedSections);
    } catch (error) {
      console.error('Failed to save sections:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Page Sections</h2>
            <p className="text-sm text-muted-foreground">Add and organize content sections for your career page</p>
          </div>
          <Button 
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </div>
      </div>

      {localSections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No sections yet</h3>
          <p className="text-sm text-muted-foreground mb-6">Get started by adding your first section</p>
          <Button onClick={handleAddSection}>
            Add Your First Section
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {localSections.map((section, index) => (
            <div 
              key={section.id} 
              className="relative bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Section Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </div>

              {/* Section Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-foreground">Section Type</label>
                      <Select
                        options={SECTION_TYPES.map((type) => ({
                          value: type.value,
                          label: type.label,
                        }))}
                        value={section.type}
                        onChange={(value) =>
                          handleUpdateSection(section.id, 'type', value as Section['type'])
                        }
                        placeholder="Select section type"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-foreground">Section Title</label>
                      <Input
                        value={section.title}
                        onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                        className="font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="w-9 h-9 flex items-center justify-center border border-input rounded-lg hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <span className="text-sm font-semibold">↑</span>
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === localSections.length - 1}
                    className="w-9 h-9 flex items-center justify-center border border-input rounded-lg hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <span className="text-sm font-semibold">↓</span>
                  </button>
                  <button
                    onClick={() => handleRemoveSection(section.id)}
                    className="w-9 h-9 flex items-center justify-center bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
                    title="Delete section"
                  >
                    <span className="text-lg font-bold">×</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4 space-y-2">
                <label className="block text-sm font-semibold text-foreground">Content</label>
                <textarea
                  value={typeof section.content === 'string' ? section.content : ''}
                  onChange={(e) => handleUpdateSection(section.id, 'content', e.target.value)}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Enter section content here..."
                />
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={section.is_visible}
                    onChange={(e) =>
                      handleUpdateSection(section.id, 'is_visible', e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-input text-primary focus:ring-2 focus:ring-ring cursor-pointer"
                  />
                  <span className={`text-sm font-medium ${section.is_visible ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {section.is_visible ? '✓ Visible on page' : 'Hidden from page'}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      {localSections.length > 0 && (
        <div className="flex justify-end pt-6 mt-6 border-t border-border">
          <Button
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? 'Saving...' : 'Save Sections'}
          </Button>
        </div>
      )}
    </Card>
  );
}

