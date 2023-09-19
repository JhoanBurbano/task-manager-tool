import { Paths } from '../enums';
import { Icons } from '../enums/icons.enum';

export interface NavbarItem {
  icon: Icons;
  title: string;
  link: Paths;
}
