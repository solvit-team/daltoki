import React from 'react';
import { Languages } from "lucide-react";
import profile1 from '@/assets/profile1.png';
import profile2 from '@/assets/profile2.png';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface HeaderProps {
  language?: string;
}

const Header: React.FC<HeaderProps> = ({ language = '한국어' }) => {
  return (
    <header className="flex items-center justify-between h-12 px-5 bg-white">
      <span className="text-black text-sm font-normal">🐰 daltoki</span>
      <div className="flex items-center gap-4">
        <Avatar className="w-5 h-5 cursor-pointer" onClick={() => window.open('https://github.com/kulupu-lapo/poki', '_blank')}>
          <AvatarImage src={profile1} alt="Profile 1" />
          <AvatarFallback>P1</AvatarFallback>
        </Avatar>
        <Avatar className="w-5 h-5 cursor-pointer" onClick={() => window.open('https://sona.pona.la/wiki/', '_blank')}>
          <AvatarImage src={profile2} alt="Profile 2" />
          <AvatarFallback>P2</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Languages /> {language}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>한국어</DropdownMenuItem>
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>中文</DropdownMenuItem>
            <DropdownMenuItem>日本語</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;