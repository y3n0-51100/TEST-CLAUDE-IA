#!/usr/bin/env bash
# Barre d'état Claude Code : consommation de tokens lisible
input=$(cat)

# Lecture des champs fournis par Claude Code (0 par défaut si absent)
model=$(jq -r '.model.display_name // "?"' <<<"$input")
in_tok=$(jq -r '.context_window.total_input_tokens // 0' <<<"$input")
out_tok=$(jq -r '.context_window.total_output_tokens // 0' <<<"$input")
size=$(jq -r '.context_window.context_window_size // 200000' <<<"$input")
pct=$(jq -r '.context_window.used_percentage // 0 | floor' <<<"$input")
cost=$(jq -r '.cost.total_cost_usd // 0' <<<"$input")

# Format lisible : 12345 -> 12.3k, 1234567 -> 1.2M
fmt() { awk -v n="$1" 'BEGIN{ if(n>=1e6) printf "%.1fM",n/1e6; else if(n>=1e3) printf "%.1fk",n/1e3; else printf "%d",n }'; }

# Barre de remplissage du contexte (10 cases), couleur selon le niveau
filled=$(( pct / 10 )); bar=""
for i in $(seq 1 10); do [ "$i" -le "$filled" ] && bar+="█" || bar+="░"; done
if   [ "$pct" -ge 80 ]; then c="\033[31m"   # rouge
elif [ "$pct" -ge 50 ]; then c="\033[33m"   # orange
else                         c="\033[32m"; fi # vert
r="\033[0m"

printf "🤖 %s │ 🧠 Contexte ${c}%s %s%%${r} (%s/%s) │ ⬆️ Entrée %s │ ⬇️ Sortie %s │ 💰 \$%.2f" \
  "$model" "$bar" "$pct" "$(fmt $((in_tok)))" "$(fmt "$size")" "$(fmt "$in_tok")" "$(fmt "$out_tok")" "$cost"
