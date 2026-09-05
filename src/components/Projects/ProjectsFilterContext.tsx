'use client';

import React, { createContext, useContext, useState } from 'react';

export const ALL_FILTER = 'All';

interface ProjectsFilterContextType {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const ProjectsFilterContext = createContext<ProjectsFilterContextType | undefined>(undefined);

export function ProjectsFilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  return (
    <ProjectsFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </ProjectsFilterContext.Provider>
  );
}

export function useProjectsFilter() {
  const context = useContext(ProjectsFilterContext);
  if (context === undefined) {
    throw new Error('useProjectsFilter must be used within a ProjectsFilterProvider');
  }
  return context;
}
