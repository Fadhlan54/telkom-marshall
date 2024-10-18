"use client";

import Button from "@/components/common/Button";
import DragNDropInput from "@/components/inputs/DragNDropInput";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { setHasChanged } from "@/lib/slices/hasChangedSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ReviewPage() {
  const [checkboxReview1, setCheckboxReview1] = useState(true);
  const [checkboxReview2, setCheckboxReview2] = useState(true);
  const [pptFile, setPptFile] = useState(null);
  const [ebookFile, setEbookFile] = useState(null);

  const dispatch = useDispatch();

  const handleHasChanged = () => {
    dispatch(setHasChanged(true));
  };

  return (
    <MainLayout>
      <ContentLayout>
        <h1 className="text-xl text-center font-semibold mb-4">Review Modul</h1>
        <form action="" onChange={handleHasChanged}>
          <h3 className="font-semibold  mt-4 mb-1">Option Review</h3>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-12 lg:gap-20">
            <div>
              <p className="text-sm">Settings</p>
              <div className="text-xs mt-1 gap-12">
                <div className="flex items-center gap-1 mb-1">
                  <input
                    type="checkbox"
                    name="review-1"
                    id="review-1"
                    checked={checkboxReview1}
                    onChange={(e) => setCheckboxReview1(e.target.checked)}
                  />
                  <label htmlFor="review-1">Review 1</label>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <input
                    type="checkbox"
                    name="review-2"
                    id="review-2"
                    checked={checkboxReview2}
                    onChange={(e) => setCheckboxReview2(e.target.checked)}
                  />
                  <label htmlFor="review-2">Review 2</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8 mt-4">
            <div className="w-full">
              <DragNDropInput
                stateFile={pptFile}
                setStateFile={setPptFile}
                label={"File Module PPT"}
                id={"ppt-input"}
                type="ppt"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <Button variant="primary" size="lg" href="/review-module/view/1">
              Review
            </Button>
          </div>
        </form>
      </ContentLayout>
    </MainLayout>
  );
}
