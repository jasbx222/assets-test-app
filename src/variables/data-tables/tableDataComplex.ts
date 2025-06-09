import useGet from "hooks/useGet";

type RowObj = {
  name: string;
  status: string;
  created_at: string;
  label: number;
};
// const { data: tableDataComplex } = useGet<RowObj[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`);
// 
// export default tableDataComplex;
