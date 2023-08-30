import React, { useState, useEffect, useRef } from 'react';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/navigation'
import { AutoComplete } from "primereact/autocomplete";
import PrimeReact from 'primereact/api';
import { InputSwitch } from 'primereact/inputswitch';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';

export const navbar = () => {
  return (
    <div>navbar</div>
  )
}
