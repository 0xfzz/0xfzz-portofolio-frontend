"use client";

import { Fragment, useState, type ReactNode } from "react";

interface TagFilterGridProps<T> {
  items: T[];
  uniqueTags: string[];
  getTags: (item: T) => string[];
  getKey: (item: T) => string;
  gridClassName: string;
  emptyMessage: string;
  header: (activeTag: string, onTagClick: (tag: string) => void) => ReactNode;
  renderItem: (item: T) => ReactNode;
}

export function TagFilterGrid<T>({
  items,
  getTags,
  getKey,
  gridClassName,
  emptyMessage,
  header,
  renderItem,
}: TagFilterGridProps<T>) {
  const [selectedTag, setSelectedTag] = useState("All");

  // Pages prepend "All" to uniqueTags themselves — do not inject it here.
  const filteredItems =
    selectedTag === "All" ? items : items.filter(item => getTags(item).includes(selectedTag));

  return (
    <>
      {header(selectedTag, setSelectedTag)}
      <div className={gridClassName}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>)
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
