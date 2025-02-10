import {Source as SourceType} from "@/lib/types.ts";
import {LinkIcon} from "lucide-react";
import moment from "moment";

const Source = ({ sources }: { sources: SourceType[] | undefined }) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-stretch">
      <header>
        <h1 className="font-bold flex justify-start gap-1 items-center lg:text-2xl text-xl">
          <LinkIcon/>
          Sources
        </h1>
      </header>
      <div className="flex flex-col justify-start items-stretch gap-2">
        <table>
          <tbody>
          {sources?.map((item: SourceType, index: number) => {
            return (
              <tr key={index}>
                <td className="w-10 flex justify-center items-start"><span
                  className="text-muted-foreground">[{index + 1}]</span></td>
                <td>
                  <cite className="text-muted-foreground">
                    {item.publisher && `${item.publisher}, `}
                    {item.name && `"${item.name}", `}
                    {item.doi && `doi: ${item.doi}, `}
                    {item.year && `year: ${item.year}, `}
                    {item.accessed && `accessed: ${moment(item.accessed).format('YYYY-MMM-DD')}, `}
                    {item.weblink && <a href={item.weblink}>link: {item.weblink}</a>}
                  </cite>
                </td>
              </tr>
          )
          })}
          </tbody>
        </table>
      </div>
    </div>
)
};

export default Source;