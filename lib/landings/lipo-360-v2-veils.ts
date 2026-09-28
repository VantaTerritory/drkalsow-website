/* Veils of the before/after views on /lipo-360-v2 (variant B).

   The page never shows a clinical photo until a tap opens the lightbox;
   in the grid each view is only a soft field of its own colours. Those
   fields are drawn with CSS, not with an image: nothing in the page's HTML
   or network points at a picture, and a tile can never become the page's
   LCP element (a gradient is not an LCP candidate).

   Generated from the doctor's composites, downscaled to 6x4 px and blurred:
   for each half (before | after), the average colour of its top, middle
   and bottom third. Regenerate if a composite changes. */

type Stops = readonly [string, string, string];

export const BA_VEILS: Record<string, readonly [Stops, Stops]> = {
  "p01-back": [["rgb(182 173 167)", "rgb(173 158 148)", "rgb(137 123 114)"], ["rgb(175 163 157)", "rgb(171 156 146)", "rgb(137 123 114)"]],
  "p01-front": [["rgb(189 175 164)", "rgb(166 145 132)", "rgb(133 114 104)"], ["rgb(195 177 168)", "rgb(176 150 138)", "rgb(145 122 112)"]],
  "p01-side": [["rgb(170 160 150)", "rgb(164 152 142)", "rgb(134 123 114)"], ["rgb(179 165 155)", "rgb(182 170 158)", "rgb(149 137 127)"]],
  "p02-back": [["rgb(208 145 154)", "rgb(198 127 129)", "rgb(170 108 112)"], ["rgb(209 141 156)", "rgb(194 126 134)", "rgb(161 103 111)"]],
  "p02-front": [["rgb(207 147 134)", "rgb(202 137 124)", "rgb(165 109 101)"], ["rgb(189 134 129)", "rgb(177 121 119)", "rgb(151 100 96)"]],
  "p02-side": [["rgb(212 141 137)", "rgb(211 131 125)", "rgb(176 107 103)"], ["rgb(214 146 142)", "rgb(203 132 126)", "rgb(170 108 103)"]],
  "p03-back": [["rgb(163 145 129)", "rgb(140 116 97)", "rgb(116 99 85)"], ["rgb(130 118 112)", "rgb(115 100 92)", "rgb(87 77 70)"]],
  "p03-front": [["rgb(186 159 140)", "rgb(167 140 120)", "rgb(139 118 102)"], ["rgb(151 136 125)", "rgb(129 110 98)", "rgb(103 87 76)"]],
  "p03-side": [["rgb(195 175 159)", "rgb(186 168 153)", "rgb(155 140 126)"], ["rgb(146 134 128)", "rgb(139 126 116)", "rgb(114 101 90)"]],
  "p04-back": [["rgb(144 127 112)", "rgb(115 96 81)", "rgb(86 73 62)"], ["rgb(127 111 99)", "rgb(126 108 96)", "rgb(101 87 77)"]],
  "p04-front": [["rgb(148 126 108)", "rgb(128 103 83)", "rgb(92 77 63)"], ["rgb(167 145 123)", "rgb(156 133 115)", "rgb(129 108 93)"]],
  "p04-side": [["rgb(131 114 95)", "rgb(106 92 75)", "rgb(77 67 54)"], ["rgb(134 119 105)", "rgb(123 111 100)", "rgb(99 89 80)"]],
  "p05-back": [["rgb(151 142 130)", "rgb(128 107 94)", "rgb(92 80 73)"], ["rgb(146 130 117)", "rgb(126 106 92)", "rgb(90 79 70)"]],
  "p05-front": [["rgb(131 120 109)", "rgb(108 92 81)", "rgb(86 72 63)"], ["rgb(143 130 120)", "rgb(116 100 90)", "rgb(92 78 69)"]],
  "p05-side": [["rgb(138 135 126)", "rgb(119 109 98)", "rgb(93 83 74)"], ["rgb(143 132 124)", "rgb(127 116 107)", "rgb(106 96 87)"]],
  "p06-back": [["rgb(166 165 154)", "rgb(153 130 113)", "rgb(114 100 90)"], ["rgb(163 156 149)", "rgb(161 140 123)", "rgb(123 108 97)"]],
  "p06-front": [["rgb(172 164 153)", "rgb(148 129 114)", "rgb(112 98 88)"], ["rgb(177 169 162)", "rgb(155 136 122)", "rgb(120 105 94)"]],
  "p06-side": [["rgb(168 167 157)", "rgb(145 132 119)", "rgb(117 107 99)"], ["rgb(159 151 144)", "rgb(143 129 118)", "rgb(117 106 98)"]],
  "p07-back": [["rgb(169 160 149)", "rgb(155 130 118)", "rgb(116 101 91)"], ["rgb(142 139 135)", "rgb(138 127 119)", "rgb(119 110 102)"]],
  "p07-front": [["rgb(154 148 141)", "rgb(138 120 111)", "rgb(104 90 83)"], ["rgb(157 149 143)", "rgb(147 132 123)", "rgb(125 115 108)"]],
  "p07-side": [["rgb(136 125 117)", "rgb(123 111 103)", "rgb(89 81 75)"], ["rgb(155 149 142)", "rgb(147 138 128)", "rgb(133 124 115)"]],
};

/** CSS background of a view's veil: before on the left, after on the right. */
export function veilBackground(id: string): string | undefined {
  const veil = BA_VEILS[id];
  if (!veil) return undefined;
  const [before, after] = veil;
  return `linear-gradient(${before.join(", ")}) left top / 50% 100% no-repeat, linear-gradient(${after.join(", ")}) right top / 50% 100% no-repeat`;
}
