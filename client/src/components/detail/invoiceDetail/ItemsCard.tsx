
export type ItemProps = { 
  description:string;
  quantity:number;
  unit_price:number;
  tax_rate:number;
};

export default function ItemsCard(props: ItemProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
        <section>
            <p className="text-sm text-gray-400">
            {props.description}
            </p>
          </section>
        <section>
            <p className="text-sm text-gray-400">
            {props.quantity}
            </p>
          </section>
        <section>
            <p className="text-sm text-gray-400">
            {props.unit_price}
            </p>
          </section>
        <section>
            <p className="text-sm text-gray-400">
            {props.tax_rate}%
            </p>
          </section>
         <section>
            <p className="text-sm text-gray-400">
            {props.unit_price*props.quantity}
            </p>
          </section>
    </div>
  );
}
