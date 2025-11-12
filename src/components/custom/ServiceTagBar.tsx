'use client';

import { ServiceTag } from '@/lib/types';
import { TAGS } from '@/lib/constants';
import { useState } from 'react';

interface ServiceTagBarProps {
  tags: ServiceTag[];
  className?: string;
}

export default function ServiceTagBar({ tags, className = '' }: ServiceTagBarProps) {
  const [hoveredTag, setHoveredTag] = useState<ServiceTag | null>(null);

  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tagKey) => {
        const tag = TAGS[tagKey];
        if (!tag) return null;

        return (
          <div
            key={tagKey}
            className="relative group"
            onMouseEnter={() => setHoveredTag(tagKey)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            {/* Tag Badge */}
            <div
              className={`
                inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full 
                border-2 transition-all duration-200
                ${tag.bgColor} ${tag.borderColor} ${tag.color}
                hover:scale-105 hover:shadow-md cursor-help
              `}
            >
              <span className="text-sm">{tag.icon}</span>
              <span className="text-xs font-semibold">{tag.label}</span>
            </div>

            {/* Tooltip */}
            {hoveredTag === tagKey && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-gray-900 text-white rounded-lg shadow-xl p-3 text-sm">
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                    <div className="border-8 border-transparent border-t-gray-900"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{tag.icon}</span>
                      <span className="font-bold">{tag.label}</span>
                    </div>
                    
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {tag.tooltip}
                    </p>

                    {tag.action && (
                      <div className="pt-2 border-t border-gray-700">
                        <p className="text-yellow-300 text-xs font-medium">
                          💡 {tag.action}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
