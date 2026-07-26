"use client";

import { updateInquiryStatus } from "@/lib/actions/admin";
import type { InquiryStatus } from "@/db/schema";

const statuses: InquiryStatus[] = ["new", "contacted", "closed"];

type Props = {
  inquiryId: string;
  currentStatus: InquiryStatus;
};

export function StatusSelect({ inquiryId, currentStatus }: Props) {
  return (
    <select
      className="min-w-[9rem] cursor-pointer"
      defaultValue={currentStatus}
      onChange={(event) => {
        void updateInquiryStatus(
          inquiryId,
          event.target.value as InquiryStatus,
        );
      }}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
