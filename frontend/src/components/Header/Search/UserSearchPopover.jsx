import {
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  Button
} from "@nextui-org/react";
import UserItem from "./UserItem";

export default function UserSearchPopover({ items }) {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {
          items?.map(item => (
            <UserItem 
              key={item._id} 
              item={item}
            />
          ))

        }
      </PopoverContent>
    </Popover>
  )
}