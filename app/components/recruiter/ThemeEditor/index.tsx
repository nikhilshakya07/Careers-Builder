'use client';

import { useState, useEffect, useRef } from 'react';
import type { Theme } from '@/app/lib/types';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  defaultColor: string;
}

function ColorPicker({ value, onChange, defaultColor }: ColorPickerProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const displayColor = value || defaultColor;

  return (
    <div className="relative">
      <input
        ref={colorInputRef}
        type="color"
        value={displayColor}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-12 h-12 opacity-0 cursor-pointer z-10"
        style={{ 
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        }}
      />
      <div
        className="w-12 h-12 rounded-lg shadow-sm cursor-pointer"
        style={{ 
          backgroundColor: displayColor,
        }}
        onClick={() => colorInputRef.current?.click()}
      />
    </div>
  );
}

interface ThemeEditorProps {
  theme: Theme;
  onUpdate: (theme: Theme) => Promise<void>;
  loading?: boolean;
}

export default function ThemeEditor({ theme, onUpdate, loading = false }: ThemeEditorProps) {
  const [localTheme, setLocalTheme] = useState<Theme>(theme);
  const [saving, setSaving] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const handleChange = (field: keyof Theme, value: string) => {
    setLocalTheme((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(localTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Theme Settings</h2>
          <p className="text-sm text-muted-foreground">Customize your career page colors and branding</p>
        </div>
      </div>

      {/* Color Picker Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Color Palette</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { key: 'primary' as const, label: 'Primary Color', default: '#3b82f6', description: 'Main brand color' },
            { key: 'secondary' as const, label: 'Secondary Color', default: '#8b5cf6', description: 'Secondary accent' },
            { key: 'accent' as const, label: 'Accent Color', default: '#10b981', description: 'Highlight color' },
          ].map(({ key, label, default: defaultColor, description }) => (
            <div key={key} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">{label}</label>
                <p className="text-xs text-muted-foreground mb-3">{description}</p>
              </div>
              <div className="flex gap-3 items-center">
                <ColorPicker
                  value={localTheme[key] || ''}
                  onChange={(value) => handleChange(key, value)}
                  defaultColor={defaultColor}
                />
                <div className="flex-1">
                  <Input
                    value={localTheme[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={defaultColor}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              {/* Color Preview */}
              <div 
                className="h-10 rounded-lg border border-border"
                style={{ backgroundColor: localTheme[key] || defaultColor }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Media URLs Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Media & Branding</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Logo URL
            </label>
            <Input
              value={localTheme.logo || ''}
              onChange={(e) => handleChange('logo', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            {localTheme.logo && (
              <div className="mt-3 p-4 bg-muted rounded-lg border border-border">
                <img 
                  src={localTheme.logo} 
                  alt="Logo preview" 
                  className="max-h-16 mx-auto"
                  style={{
                    background: 'transparent',
                    mixBlendMode: 'normal',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Banner Image URL
            </label>
            <Input
              value={localTheme.banner || ''}
              onChange={(e) => handleChange('banner', e.target.value)}
              placeholder="https://example.com/banner.jpg"
            />
            {localTheme.banner && (
              <div className="mt-3 rounded-lg border border-border overflow-hidden">
                <img 
                  src={localTheme.banner} 
                  alt="Banner preview" 
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Video URL (YouTube, Vimeo, etc.)
            </label>
            <Input
              value={localTheme.video || ''}
              onChange={(e) => handleChange('video', e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border">
        <Button
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving ? 'Saving...' : 'Save Theme'}
        </Button>
      </div>
    </Card>
  );
}

