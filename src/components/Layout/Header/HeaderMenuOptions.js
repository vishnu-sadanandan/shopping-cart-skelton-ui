import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import LoginButton from './LoginButton.js'
import {User} from "@nextui-org/react";

export default function HeaderMenuOptions(props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
        >
            <User
                name="Bob Mary"
                description="bob@user.com"
                avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
            />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="orders">Orders</DropdownItem>
        <DropdownItem key="edit"><LoginButton onClick={props.onCartOpen} /></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}