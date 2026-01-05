/**
 * Industry Icons Mapping
 * Dynamically imports SVG icons from the assets folder as URLs
 * Maps industry IDs to their corresponding icon paths
 */

// Import all industry icons from the Industries folder as URLs
import AgricultureIcon from '../../assets/Industry_Icons/Industries/Property 1=Agriculture.svg';
import ArtIcon from '../../assets/Industry_Icons/Industries/Property 1=Art.svg';
import BusinessIcon from '../../assets/Industry_Icons/Industries/Property 1=Business.svg';
import ChatIcon from '../../assets/Industry_Icons/Industries/Property 1=Chat.svg';
import EducationIcon from '../../assets/Industry_Icons/Industries/Property 1=Education.svg';
import EngineeringIcon from '../../assets/Industry_Icons/Industries/Property 1=Engineering.svg';
import EnvironmentIcon from '../../assets/Industry_Icons/Industries/Property 1=Environment.svg';
import HumantiesIcon from '../../assets/Industry_Icons/Industries/Property 1=Humanties.svg';
import ITIcon from '../../assets/Industry_Icons/Industries/Property 1=IT.svg';
import JournalismIcon from '../../assets/Industry_Icons/Industries/Property 1=Journlism.svg';
import LabIcon from '../../assets/Industry_Icons/Industries/Property 1=Lab.svg';
import LawIcon from '../../assets/Industry_Icons/Industries/Property 1=Law.svg';
import MedicalIcon from '../../assets/Industry_Icons/Industries/Property 1=Medical.svg';
import MicroscopeIcon from '../../assets/Industry_Icons/Industries/Property 1=Microscope.svg';
import SportsIcon from '../../assets/Industry_Icons/Industries/Property 1=Sports.svg';

/**
 * Icon mapping: industry slug -> icon URL
 * Each industry ID corresponds to a specific icon from the Industries folder
 */
export const IndustryIcons: Record<string, string> = {
  'agriculture-forestry': AgricultureIcon,
  'applied-sciences-professions': MicroscopeIcon,
  'arts-design-architecture': ArtIcon,
  'business-management': BusinessIcon,
  'computer-science-it': ITIcon,
  'education-training': EducationIcon,
  'engineering-technology': EngineeringIcon,
  'environmental-sciences': EnvironmentIcon,
  'hospitality-leisure-sports': SportsIcon,
  'humanities': HumantiesIcon,
  'journalism-media': JournalismIcon,
  'law': LawIcon,
  'medicine-health': MedicalIcon,
  'natural-sciences-mathematics': LabIcon,
  'social-sciences': ChatIcon,
};

